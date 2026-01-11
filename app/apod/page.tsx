import ClientSideApod from "./client-side-apod";

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
      {
        next: { revalidate: 60 * 60 },
        signal: AbortSignal.timeout(10000)
      }
    );

    if (!res.ok) {
      console.log(`Failed to fetch APOD: ${res.statusText}`);
      apod = { title: "Failed to load" };
    } else {
      apod = await res.json();
    }
    return <ClientSideApod apod={apod} />;
  } catch {
    apod = { title: "Failed to load: Gateway Timeout" };
    return <ClientSideApod apod={apod} />;
  }
}
