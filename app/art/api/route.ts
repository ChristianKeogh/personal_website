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
        // optional but recommended
        cache: "no-store",
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
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error fetching images" },
      { status: 500 }
    );
  }
}
