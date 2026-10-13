import { unstable_rethrow } from "next/navigation";
import ClientSideApod from "./client-side-apod";

export const revalidate = 0;
export const maxDuration = 60;

export interface APODType {
  date?: string;
  explanation?: string;
  hdurl?: string;
  media_type?: string;
  title: string;
  url?: string;
}

const GENERIC_TITLES = /^(error|nasa|nasa science|apod|apod - nasa science|astronomy picture of the day)$/i;
const LOGO_URL = /nasa[-_]?logo|nasa[-_]?meatball|\/themes\/nasa-child\//i;

function ymd(timeZone: string, at: Date) {
  return at.toLocaleDateString("en-CA", { timeZone });
}

function describeError(error: unknown) {
  const text =
    error instanceof Error
      ? `${error.name}: ${error.message}`
      : "Unknown error";
  const key = process.env.APOD_KEY;
  const withoutKey = key ? text.split(key).join("[redacted]") : text;
  return withoutKey.replace(/api_key=[^&\s]+/gi, "api_key=[redacted]");
}

function parseApod(payload: unknown): APODType {
  const raw = Array.isArray(payload) ? payload[0] : payload;
  if (!raw || typeof raw !== "object") {
    throw new Error("NASA APOD response was not a real picture");
  }

  const item = raw as Record<string, unknown>;
  const title = typeof item.title === "string" ? item.title.trim() : "";
  const date = typeof item.date === "string" ? item.date.trim() : "";
  const mediaType =
    typeof item.media_type === "string" ? item.media_type.trim() : "";
  const hdurl = typeof item.hdurl === "string" ? item.hdurl.trim() : "";
  const permalink = typeof item.url === "string" ? item.url.trim() : "";
  const explanation =
    typeof item.explanation === "string"
      ? item.explanation
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .replace(/^\s*Explanation:\s*/i, "")
          .trim()
      : "";

  // WordPress API: `url` is the article permalink; the picture is `hdurl`.
  const url = mediaType === "image" ? hdurl : permalink || hdurl;
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86400000);
  const allowedDates = new Set([
    ymd("UTC", now),
    ymd("America/New_York", now),
    ymd("UTC", yesterday),
    ymd("America/New_York", yesterday),
  ]);

  if (
    !title ||
    GENERIC_TITLES.test(title) ||
    (mediaType !== "image" && mediaType !== "video") ||
    !url ||
    LOGO_URL.test(url) ||
    (mediaType === "image" &&
      (url.includes("/image-article/") || !/\.(jpe?g|png|gif|webp)(\?|$)/i.test(url))) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !allowedDates.has(date) ||
    explanation.length < 40
  ) {
    throw new Error(
      `NASA APOD response was not a real picture (${title || "no title"})`
    );
  }

  return { title, date, explanation, media_type: mediaType, hdurl, url };
}

async function fetchApod(timeoutMs: number): Promise<APODType> {
  const key = process.env.APOD_KEY;
  if (!key) throw new Error("APOD_KEY is not set");

  const endpoint = new URL("https://science.nasa.gov/wp-json/wp/v2/apod-basic");
  endpoint.searchParams.set("api_key", key);
  endpoint.searchParams.set("per_page", "1");

  const res = await fetch(endpoint, {
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!res.ok) {
    const detail = (await res.text()).replace(/\s+/g, " ").trim().slice(0, 300);
    throw new Error(
      `NASA APOD responded with ${res.status} ${res.statusText}${detail ? `: ${detail}` : ""}`
    );
  }

  return parseApod(await res.json());
}

export default async function ApodPage() {
  try {
    let apod: APODType;
    try {
      apod = await fetchApod(10_000);
    } catch (error) {
      console.error(`APOD fetch failed, retrying once: ${describeError(error)}`);
      apod = await fetchApod(20_000);
    }
    return <ClientSideApod apod={apod} />;
  } catch (error) {
    unstable_rethrow(error);
    const message = describeError(error);
    console.error(`Failed to load APOD: ${message}`);
    return <ClientSideApod error={message} />;
  }
}
