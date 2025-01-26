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
    return (
      <section className="text-center">
        <h1 className="text-2xl">{"Failed to load for whatever reason :("}</h1>
      </section>
    );
  }
  return (
    <section className="text-justify">
      <h1 className="text-2xl font-bold">{apod.title}</h1>
      <p className="text-neutral-400">{apod.date}</p>
      <br />
      {apod.media_type === "image" ? (
        <img src={apod.url} alt={apod.title} style={{ maxWidth: "100%" }} />
      ) : (
        <iframe
          src={apod.url}
          title={apod.title}
          width="100%"
          height="400"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
      <br />
      <p>{apod.explanation}</p>
    </section>
  );
}
