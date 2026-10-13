import { unstable_rethrow } from "next/navigation";
import GalleryClient, { ArtItem } from "./gallery-client";

export const revalidate = 60;

const MANIFEST_URL =
  "https://images-ch.s3.eu-north-1.amazonaws.com/manifest.json";
const IMAGE_HOST = "https://images-ch.s3.eu-north-1.amazonaws.com";

const CATEGORY = {
  personal: "Personal",
  "professional-animation": "Production",
} as const;

async function getImages(): Promise<ArtItem[]> {
  const res = await fetch(MANIFEST_URL, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Gallery manifest ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Gallery manifest must be a JSON array");
  }

  return data.map((entry: { key: string; description: string }) => {
    const [root, folder, file] = entry.key.split("/");
    const category = CATEGORY[root as keyof typeof CATEGORY];
    if (!category || !folder || !file) {
      throw new Error(`Invalid gallery key: ${entry.key}`);
    }
    return {
      id: entry.key,
      title: entry.description || file,
      category,
      url: `${IMAGE_HOST}/${entry.key}`,
      description: entry.description,
      folder,
    };
  });
}

export default async function ArtPage() {
  try {
    const items = await getImages();
    return (
      <div className="py-8">
        <GalleryClient initialItems={items} />
      </div>
    );
  } catch (error) {
    unstable_rethrow(error);
    console.error("Failed to load art gallery:", error);
    return (
      <div className="py-8">
        <GalleryClient
          initialItems={[]}
          error={error instanceof Error ? error.message : String(error)}
        />
      </div>
    );
  }
}
