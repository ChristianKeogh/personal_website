import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log(process.env.PERSONAL_WEBSITE_IMAGES);
    const response = await fetch(
      "https://60772oqba0.execute-api.eu-north-1.amazonaws.com/get-images-api",
      {
        headers: {
          "x-api-key": process.env.PERSONAL_WEBSITE_IMAGES || '',
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      return NextResponse.json(
        { error: "Failed to fetch images" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // The AWS response has a 'body' string that contains the actual data
    if (data.body) {
      const parsedBody = JSON.parse(data.body);
      const items = parsedBody.Items || [];
      
      const cleanItems = items.map((item: any) => {
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
          category: category,
          url: url,
          description: description,
          folder: cleanFolder
        };
      });

      return NextResponse.json(cleanItems);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error fetching images" },
      { status: 500 }
    );
  }
}
