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
  "apod - nasa science",
  "astronomy picture of the day",
]);

const PLACEHOLDER_URL_PATTERN =
  /nasa[-_]?logo|nasa[-_]?meatball|\/themes\/nasa-child\//i;

const IMAGE_PATH_PATTERN = /\.(jpe?g|png|gif|webp|avif)(\?|$)/i;

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

export function stripHtml(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^Explanation:\s*/i, "")
    .trim();
}

export function unwrapApodResponse(value: unknown): unknown {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      throw new Error("NASA APOD response was an empty list");
    }
    return value[0];
  }
  return value;
}

function isPlaceholderAsset(url: string): boolean {
  return PLACEHOLDER_URL_PATTERN.test(url);
}

function looksLikeImageUrl(url: string): boolean {
  const parsed = isHttpUrl(url);
  if (!parsed) return false;
  if (parsed.pathname.includes("/image-article/")) return false;
  return (
    IMAGE_PATH_PATTERN.test(parsed.pathname) ||
    parsed.hostname.includes("assets.science.nasa.gov") ||
    parsed.hostname.includes("apod.nasa.gov")
  );
}

function looksLikeVideoUrl(url: string): boolean {
  const parsed = isHttpUrl(url);
  if (!parsed) return false;
  const host = parsed.hostname.replace(/^www\./, "");
  return (
    host === "youtube.com" ||
    host === "youtu.be" ||
    host === "youtube-nocookie.com" ||
    parsed.pathname.includes("/embed/")
  );
}

export function normalizeApodRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object") {
    throw new Error("NASA APOD response was not an object");
  }

  const record = value as Record<string, unknown>;
  const mediaType =
    typeof record.media_type === "string" ? record.media_type.trim() : "";
  const hdurl = typeof record.hdurl === "string" ? record.hdurl.trim() : "";
  const rawUrl = typeof record.url === "string" ? record.url.trim() : "";
  const explanation =
    typeof record.explanation === "string"
      ? stripHtml(record.explanation)
      : "";
  const title =
    typeof record.title === "string" ? record.title.trim() : "";

  // On the WordPress API, `url` is the article permalink. The picture is hdurl.
  let url = rawUrl;
  if (mediaType === "image") {
    url = hdurl || rawUrl;
  } else if (mediaType === "video" || mediaType === "iframe") {
    url = looksLikeVideoUrl(rawUrl) ? rawUrl : hdurl || rawUrl;
  }

  return {
    ...record,
    title,
    explanation,
    media_type: mediaType === "iframe" ? "video" : mediaType,
    hdurl: hdurl || undefined,
    url,
  };
}

export function apodPayloadFailure(
  value: unknown,
  now = new Date()
): string | null {
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
    return "missing image url";
  }
  if (!isHttpUrl(url)) {
    return "url was not an http(s) address";
  }
  if (isPlaceholderAsset(url)) {
    return "url is a NASA placeholder/logo asset";
  }
  if (mediaType === "image" && !looksLikeImageUrl(url)) {
    return "url is not an image asset (article permalink is not the picture)";
  }
  if (mediaType === "video" && !looksLikeVideoUrl(url)) {
    return "url is not a video embed";
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
  const record = normalizeApodRecord(unwrapApodResponse(value));
  const failure = apodPayloadFailure(record, now);
  if (failure) {
    throw new Error(`NASA APOD response was not a real picture (${failure})`);
  }

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
