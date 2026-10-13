import { unstable_rethrow } from "next/navigation";
import GalleryClient from "./gallery-client";
import { fetchGalleryItems } from "./manifest";

export const revalidate = 60;

export default async function ArtPage() {
  try {
    const items = await fetchGalleryItems();
    return (
      <div className="py-8">
        <GalleryClient initialItems={items} />
      </div>
    );
  } catch (error) {
    unstable_rethrow(error);
    const message =
      error instanceof Error ? error.message : "Unknown gallery error";
    console.error("Failed to load art gallery:", error);
    return (
      <div className="py-8">
        <GalleryClient initialItems={[]} error={message} />
      </div>
    );
  }
}
