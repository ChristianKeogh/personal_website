import GalleryClient, { ArtItem } from "./gallery-client";

async function getImages(): Promise<ArtItem[]> {
  try {
    const response = await fetch(
      "https://60772oqba0.execute-api.eu-north-1.amazonaws.com/get-images-api",
      {
        headers: {
          "x-api-key": process.env.PERSONAL_WEBSITE_IMAGES || "",
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch images:", response.status);
      return [];
    }

    const data = await response.json();
    
    if (data.body) {
      const parsedBody = JSON.parse(data.body);
      const items = parsedBody.Items || [];
      
      return items.map((item: any) => {
        const imageKey = item.imageKey?.S || "";
        const bucket = item.bucket?.S || "";
        const description = item.description?.S || "";
        const folder = item.folder?.S || "";
        
        const url = `https://${bucket}.s3.eu-north-1.amazonaws.com/${imageKey}`;
        
        let category = "Personal";
        if (folder.includes("professional") || folder.includes("production")) {
          category = "Production";
        }

        const title = imageKey.split('/').pop()?.split('.')[0] || "Untitled";
        const cleanFolder = folder.split('/').pop() || folder;

        return {
          id: imageKey,
          title: title,
          category: category as "Production" | "Personal",
          url: url,
          description: description,
          folder: cleanFolder
        };
      });
    }

    return [];
  } catch (error) {
    console.error("Server error fetching images:", error);
    return [];
  }
}

export default async function ArtPage() {
  const items = await getImages();

  return (
    <div className="py-8">
      <GalleryClient initialItems={items} />
    </div>
  );
}
