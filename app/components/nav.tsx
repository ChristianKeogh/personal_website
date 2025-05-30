"use client";
import Link from "next/link";
import { useState } from "react";

interface DropdownItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  dropdownItemsOther?: DropdownItem[];
  dropdownItemsSites?: DropdownItem[];
}

const navItems: Record<string, NavItem> = {
  "/": {
    name: "christian keogh"
  },
  "/about": {
    name: "about"
  },
  "/blog": {
    name: "blog"
  },
  "/sites": {
    name: "websites",
    dropdownItemsSites: [
      {
        name: "First Website",
        path: "/websites/firstWebsite"
      }
    ]
  },
  "/other": {
    name: "other",
    dropdownItemsOther: [
      { name: "Nasa image of the day", path: "/apod" },
      { name: "US Debt", path: "/us-debt" },
      { name: "Snake", path: "/snake" }
    ]
  }
};

export function Navbar() {
  const [isDropdownOpenOther, setIsDropdownOpenOther] = useState(false);
  const [isDropdownOpenSites, setIsDropdownOpenSites] = useState(false);

  const handleLinkClick = () => {
    setIsDropdownOpenOther(false);
    setIsDropdownOpenSites(false);
  };

  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex justify-center items-center relative px-0 pb-0 fade"
          id="nav"
        >
          <div className="flex flex-wrap justify-center space-x-6">
            {Object.entries(navItems).map(([path, item]) => {
              const isChristianKeogh = item.name === "christian keogh";

              if (path === "/other") {
                return (
                  <div
                    key={path}
                    className="relative group ml-0"
                    onMouseEnter={() => setIsDropdownOpenOther(true)}
                    onMouseLeave={() => setIsDropdownOpenOther(false)}
                  >
                    <button className="transition-all flex align-middle relative py-1 px-2 m-1 text-neutral-400 hover:text-neutral-100">
                      {item.name}
                    </button>
                    {isDropdownOpenOther && item.dropdownItemsOther && (
                      <div className="absolute left-0 mt-0 bg-black shadow-xl z-50 min-w-32">
                        {item.dropdownItemsOther.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            href={dropdownItem.path}
                            onClick={handleLinkClick}
                            className="block px-4 py-2 text-sm text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (path === "/sites") {
                return (
                  <div
                    key={path}
                    className="relative group ml-0"
                    onMouseEnter={() => setIsDropdownOpenSites(true)}
                    onMouseLeave={() => setIsDropdownOpenSites(false)}
                  >
                    <button className="transition-all flex align-middle relative py-1 px-2 m-1 text-neutral-400 hover:text-neutral-100">
                      {item.name}
                    </button>
                    {isDropdownOpenSites && item.dropdownItemsSites && (
                      <div className="absolute left-0 mt-0 bg-black shadow-xl z-50 min-w-32">
                        {item.dropdownItemsSites.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            href={dropdownItem.path}
                            onClick={handleLinkClick}
                            className="block px-4 py-2 text-sm text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

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
                  {item.name}
                </Link>
              );
            })}

            {/* External Links */}
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
              <p className="h-7">linkedin</p>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
