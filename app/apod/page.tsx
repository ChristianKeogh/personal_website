import ClientSideApod from "./client-side-apod";

const revalidate = 3600

export interface APODType {
  date?: string;
  explanation?: string;
  hdurl?: string;
  media_type?: string;
  service_version?: string;
  title: string;
  url?: string;
}

export default async function ApodPage() {
  let apod: APODType;

  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.APOD_KEY}`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch APOD: ${res.statusText}`);
    }

    apod = await res.json();
  } catch (error) {
    console.error("Error fetching APOD data:", error);
    apod = { title: "Error", date: "" };
  }

  return <ClientSideApod apod={apod} />;
}
