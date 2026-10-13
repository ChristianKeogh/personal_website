export default function Footer() {
  return (
    <footer className="mt-auto w-full px-2 md:px-0 pt-8 pb-8 flex flex-col items-center justify-center space-y-2 text-sm text-neutral-500">
      <div className="flex space-x-6">
        <a
          href="https://github.com/ChristianKeogh"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/christian-keogh-94888a28b/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          LinkedIn
        </a>
      </div>
      <p>© {new Date().getFullYear()} Christian Keogh. All rights reserved.</p>
    </footer>
  );
}
