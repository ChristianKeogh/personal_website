export const APOD_LOAD_ERROR = "Error";

export interface APODType {
  date?: string;
  explanation?: string;
  hdurl?: string;
  media_type?: string;
  service_version?: string;
  title: string;
  url?: string;
}

const GENERIC_TITLES = new Set([
  "error",
  "nasa",
  "nasa science",
  "apod",
  "astronomy picture of the day",
]);

const PLACEHOLDER_URL_PATTERN =
  /nasa[-_]?logo|nasa[-_]?meatball|\/themes\/nasa-child\//i;

function calendarDate(timeZone: string, at: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(at);
}

function allowedApodDates(now = new Date()): Set<string> {
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return new Set([
    calendarDate("UTC", now),
    calendarDate("America/New_York", now),
    calendarDate("UTC", yesterday),
    calendarDate("America/New_York", yesterday),
  ]);
}

function normalizeTitle(title: string): string {
  return title.replace(/\s+/g, " ").trim().toLowerCase();
}

function isHttpUrl(value: string): URL | null {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function isPlaceholderAsset(url: string): boolean {
  return PLACEHOLDER_URL_PATTERN.test(url);
}

export function apodPayloadFailure(value: unknown, now = new Date()): string | null {
  if (!value || typeof value !== "object") {
    return "response was not an object";
  }

  const record = value as Record<string, unknown>;
  const title = typeof record.title === "string" ? record.title.trim() : "";
  if (!title) {
    return "missing title";
  }
  if (GENERIC_TITLES.has(normalizeTitle(title))) {
    return `generic title ${JSON.stringify(title)}`;
  }

  const mediaType =
    typeof record.media_type === "string" ? record.media_type.trim() : "";
  if (mediaType !== "image" && mediaType !== "video") {
    return "missing or invalid media_type";
  }

  const url = typeof record.url === "string" ? record.url.trim() : "";
  if (!url) {
    return "missing url";
  }
  if (!isHttpUrl(url)) {
    return "url was not an http(s) address";
  }
  if (isPlaceholderAsset(url)) {
    return "url is a NASA placeholder/logo asset";
  }

  if (typeof record.hdurl === "string" && record.hdurl.trim()) {
    const hdurl = record.hdurl.trim();
    if (!isHttpUrl(hdurl)) {
      return "hdurl was not an http(s) address";
    }
    if (isPlaceholderAsset(hdurl)) {
      return "hdurl is a NASA placeholder/logo asset";
    }
  }

  const date = typeof record.date === "string" ? record.date.trim() : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return "missing or malformed date";
  }
  if (!allowedApodDates(now).has(date)) {
    return `date ${date} is not today or yesterday`;
  }

  const explanation =
    typeof record.explanation === "string" ? record.explanation.trim() : "";
  if (explanation.length < 40) {
    return "missing or too-short explanation";
  }

  return null;
}

export function parseApodPayload(value: unknown, now = new Date()): APODType {
  const failure = apodPayloadFailure(value, now);
  if (failure) {
    throw new Error(`NASA APOD response was not a real picture (${failure})`);
  }

  const record = value as Record<string, unknown>;
  return {
    date: record.date as string,
    explanation: record.explanation as string,
    hdurl: typeof record.hdurl === "string" ? record.hdurl : undefined,
    media_type: record.media_type as string,
    service_version:
      typeof record.service_version === "string"
        ? record.service_version
        : undefined,
    title: (record.title as string).trim(),
    url: record.url as string,
  };
}
