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
  "/blog": {
    name: "blog"
  },
  "/other": {
    name: "projects / other",
    dropdownItemsOther: [
      { name: "USCongress", path: "/websites/USCWebsite" },
      { name: "Hacker News", path: "/websites/hackerNews" },
      { name: "CycleHub", path: "/websites/Cyclehub" },
      { name: "First Website", path: "/websites/firstWebsite" },
      { name: "Nasa image of the day", path: "/apod" },
      { name: "US Debt", path: "/us-debt" },
      { name: "Snake", path: "/snake" }
    ]
  },
  // "/art": {
  //   name: "art"
  // }
};

export function Navbar() {
  const [isDropdownOpenOther, setIsDropdownOpenOther] = useState(false);

  const handleLinkClick = () => {
    setIsDropdownOpenOther(false);
  };

  return (
    <aside className="z-[9999] sticky top-0 bg-black/80 backdrop-blur-md mb-16 tracking-tight">
      <nav
        className="flex justify-center items-center relative px-0 pb-0 fade z-[9999]"
        id="nav"
      >
        <div className="flex flex-wrap justify-center space-x-6">
          {Object.entries(navItems).map(([path, item]) => {
            const isChristianKeogh = item.name === "christian keogh";

            if (path === "/other") {
              return (
                <div
                  key={path}
                  className="relative group m-0"
                  onMouseEnter={() => setIsDropdownOpenOther(true)}
                  onMouseLeave={() => setIsDropdownOpenOther(false)}
                >
                  <button className="transition-all flex align-middle relative py-1 px-2 m-1 text-neutral-400 hover:text-neutral-100">
                    {item.name}
                  </button>
                  {isDropdownOpenOther && item.dropdownItemsOther && (
                    <div className="absolute left-0 top-full bg-black shadow-xl z-[9998] min-w-32">
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
        </div>
      </nav>
    </aside>
  );
}
