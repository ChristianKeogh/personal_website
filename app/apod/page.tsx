import { unstable_cache } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import ClientSideApod from "./client-side-apod";

// The route itself is not cached. A failed render used to be stored for a day
// via `revalidate = 86400`. Successful payloads are cached below and reused
// when a later refresh fails.
export const revalidate = 0;

// First attempt is 10s; the retry uses a longer timeout. Both need to finish
// inside the function limit.
export const maxDuration = 60;

const SUCCESS_REVALIDATE_SECONDS = 60 * 60 * 24;
const FIRST_ATTEMPT_MS = 10_000;
const RETRY_ATTEMPT_MS = 20_000;

const APOD_LOAD_ERROR = "Error";

export interface APODType {
  date?: string;
  explanation?: string;
  hdurl?: string;
  media_type?: string;
  service_version?: string;
  title: string;
  url?: string;
}

function redact(value: string): string {
  const key = process.env.APOD_KEY;
  const withoutKey = key ? value.split(key).join("[redacted]") : value;
  return withoutKey.replace(/api_key=[^&\s]+/gi, "api_key=[redacted]");
}

function errorText(error: unknown): string {
  if (error instanceof Error) {
    const cause =
      error.cause instanceof Error ? `: ${error.cause.message}` : "";
    return redact(`${error.name}: ${error.message}${cause}`);
  }
  return "Unknown error";
}

function isApodPayload(value: unknown): value is APODType {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.title === "string" &&
    record.title.length > 0 &&
    record.title !== APOD_LOAD_ERROR &&
    typeof record.url === "string" &&
    record.url.length > 0
  );
}

async function requestApod(timeoutMs: number): Promise<APODType> {
  const key = process.env.APOD_KEY;
  if (!key) {
    throw new Error("APOD_KEY is not set");
  }

  let response: Response;
  try {
    response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${key}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(timeoutMs),
      }
    );
  } catch (error) {
    throw new Error(errorText(error));
  }

  if (!response.ok) {
    let detail = "";
    try {
      detail = redact(await response.text())
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 300);
    } catch {
      detail = "";
    }
    const status = `${response.status} ${response.statusText}`.trim();
    throw new Error(
      detail
        ? `NASA APOD responded with ${status}: ${detail}`
        : `NASA APOD responded with ${status}`
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error(`NASA APOD returned invalid JSON (${errorText(error)})`);
  }

  if (!isApodPayload(payload)) {
    throw new Error("NASA APOD response was missing a title or url");
  }

  return payload;
}

async function fetchApod(): Promise<APODType> {
  try {
    return await requestApod(FIRST_ATTEMPT_MS);
  } catch (error) {
    console.error(`APOD fetch failed, retrying once: ${errorText(error)}`);
    return await requestApod(RETRY_ATTEMPT_MS);
  }
}

// Throws on failure, so a bad response is never written here. While this entry
// is fresh, NASA is not called. Once it is stale, a failed refresh keeps the
// previous picture and the next request tries again.
const getCachedApod = unstable_cache(fetchApod, ["nasa-apod"], {
  revalidate: SUCCESS_REVALIDATE_SECONDS,
});

export default async function ApodPage() {
  try {
    const apod = await getCachedApod();
    return <ClientSideApod apod={apod} />;
  } catch (error) {
    unstable_rethrow(error);
    console.error(`Failed to load APOD: ${errorText(error)}`);
    return <ClientSideApod apod={{ title: APOD_LOAD_ERROR }} />;
  }
}
