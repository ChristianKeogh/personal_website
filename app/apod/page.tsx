import ClientSideApod from "./client-side-apod";

export const dynamic = "force-dynamic";

export default async function ApodPage() {
  let apod: any = null;

  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.APOD_KEY}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch APOD: ${res.statusText}`);
    }

    apod = await res.json();
  } catch (error) {
    console.error("Error fetching APOD data:", error);
    apod = { title: "Error", date: "" }; // Handle failure gracefully
  }

  return <ClientSideApod apod={apod} />;
}
