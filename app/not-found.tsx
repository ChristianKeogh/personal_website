export default function NotFound() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        404 - Page Not Found
      </h1>
      <p className="mb-4 text-neutral-400">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="text-white hover:text-neutral-300 underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300 transition-all"
      >
        Go back home
      </a>
    </section>
  );
}
