export default async function ApodPage() {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.APOD_KEY}`
  );
  const apod = await res.json();

  return (
    <section className="text-justify">
      <h1>{apod.title}</h1>
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
