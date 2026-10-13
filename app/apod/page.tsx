import { unstable_rethrow } from "next/navigation";
import { parseApodPayload, type APODType } from "./apod-payload";
import ClientSideApod from "./client-side-apod";

export type { APODType };

// Do not store the route. Fetch uses cache: "no-store" so a timeout, 500, or
// placeholder body is never kept, and yesterday's picture is not shown when
// today's request fails.
export const revalidate = 0;

export const maxDuration = 60;

const FIRST_ATTEMPT_MS = 10_000;
const RETRY_ATTEMPT_MS = 20_000;

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

function apodEndpoint(apiKey: string): string {
  const endpoint = new URL(
    "https://science.nasa.gov/wp-json/wp/v2/apod-basic"
  );
  endpoint.searchParams.set("api_key", apiKey);
  endpoint.searchParams.set("per_page", "1");
  return endpoint.toString();
}

async function requestApod(timeoutMs: number): Promise<APODType> {
  const key = process.env.APOD_KEY;
  if (!key) {
    throw new Error("APOD_KEY is not set");
  }

  let response: Response;
  try {
    response = await fetch(apodEndpoint(key), {
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
    });
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

  return parseApodPayload(payload);
}

async function fetchApod(): Promise<APODType> {
  try {
    return await requestApod(FIRST_ATTEMPT_MS);
  } catch (error) {
    console.error(`APOD fetch failed, retrying once: ${errorText(error)}`);
    return await requestApod(RETRY_ATTEMPT_MS);
  }
}

export default async function ApodPage() {
  try {
    const apod = await fetchApod();
    return <ClientSideApod apod={apod} />;
  } catch (error) {
    unstable_rethrow(error);
    const message = errorText(error);
    console.error(`Failed to load APOD: ${message}`);
    return <ClientSideApod error={message} />;
  }
}
