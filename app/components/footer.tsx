export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-xl px-4 md:px-0 bg-black/80 backdrop-blur-md z-50 pb-4 pt-4 flex flex-col items-center justify-center space-y-2 text-sm text-neutral-500">
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
