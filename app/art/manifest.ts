import type { ArtItem, Category, ManifestEntry } from "./types";

export type { ManifestEntry };

export const MANIFEST_URL =
  "https://images-ch.s3.eu-north-1.amazonaws.com/manifest.json";
export const IMAGE_HOST = "https://images-ch.s3.eu-north-1.amazonaws.com";

const CATEGORY_BY_ROOT = {
  personal: "Personal",
  "professional-animation": "Production",
} as const satisfies Record<string, Category>;

function describeError(error: unknown) {
  return error instanceof Error
    ? `${error.name}: ${error.message}`
    : String(error);
}

function publicObjectUrl(key: string) {
  return `${IMAGE_HOST}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

function filenameFromKey(key: string) {
  const filename = key.split("/").pop()?.trim();
  return filename || key;
}

function altText(description: string, key: string) {
  const caption = description.trim();
  return caption || filenameFromKey(key);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function parseManifest(payload: unknown): ArtItem[] {
  if (!Array.isArray(payload)) {
    throw new Error("Gallery manifest must be a JSON array of entries");
  }

  return payload.map((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new Error(`Gallery manifest entry ${index} must be an object`);
    }

    const record = entry as Record<string, unknown>;
    const key = record.key;
    const description = record.description;

    if (typeof key !== "string" || !key.trim()) {
      throw new Error(
        `Gallery manifest entry ${index} is missing a string "key"`
      );
    }
    if (typeof description !== "string") {
      throw new Error(
        `Gallery manifest entry ${index} is missing a string "description"`
      );
    }
    if (record.tags !== undefined && !isStringArray(record.tags)) {
      throw new Error(
        `Gallery manifest entry ${index} has invalid "tags"; expected string[]`
      );
    }

    const trimmedKey = key.trim();
    const segments = trimmedKey.split("/").filter(Boolean);
    if (segments.length < 3) {
      throw new Error(
        `Gallery manifest entry ${index} key "${trimmedKey}" must be top-level/group/file`
      );
    }

    const root = segments[0];
    const heading = segments[1];
    const category =
      root === "personal" || root === "professional-animation"
        ? CATEGORY_BY_ROOT[root]
        : undefined;
    if (!category) {
      const allowed = Object.keys(CATEGORY_BY_ROOT).join(", ");
      throw new Error(
        `Gallery manifest entry ${index} key "${trimmedKey}" uses unknown top-level folder "${root}". Expected one of: ${allowed}`
      );
    }

    return {
      id: trimmedKey,
      title: altText(description, trimmedKey),
      category,
      url: publicObjectUrl(trimmedKey),
      description,
      folder: heading,
    };
  });
}

export async function fetchGalleryItems(): Promise<ArtItem[]> {
  let response: Response;
  try {
    response = await fetch(MANIFEST_URL, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    throw new Error(
      `Failed to fetch gallery manifest: ${describeError(error)}`
    );
  }

  if (!response.ok) {
    const detail = (await response.text()).replace(/\s+/g, " ").trim().slice(0, 300);
    throw new Error(
      `Gallery manifest responded with ${response.status} ${response.statusText}${
        detail ? `: ${detail}` : ""
      }`
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error(
      `Gallery manifest was not valid JSON: ${describeError(error)}`
    );
  }

  return parseManifest(payload);
}
