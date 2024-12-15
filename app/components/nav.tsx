import Link from "next/link";

const navItems = {
  "/": {
    name: "christian keogh"
  },
  "/about": {
    name: "about"
  },
  "/blog": {
    name: "blog"
  }
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isChristianKeogh = name === "christian keogh";
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all flex align-middle relative py-1 px-2 m-1 ${
                    !isChristianKeogh
                      ? "text-neutral-400 hover:text-neutral-100"
                      : ""
                  }`}
                >
                  {name}
                </Link>
              );
            })}
            {/* Links */}
            <a
              className="transition-all flex align-middle relative py-1 px-2 m-1 text-neutral-400 hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/ChristianKeogh"
            >
              <p className="h-7">github</p>
            </a>
            <a
              className="transition-all flex align-middle relative py-1 px-2 m-1 text-neutral-400 hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/christian-keogh-94888a28b/"
            >
              <p className="  h-7">linkedin</p>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
