export default function Footer() {
  return (
    <footer className="mb-16 mt-20 flex flex-col items-center justify-center space-y-4 text-sm text-neutral-500">
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
          href="https://linkedin.com/in/christian-keogh"
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
