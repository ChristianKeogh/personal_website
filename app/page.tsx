import type { Viewport } from "next";
import Contact from "./homeComponents/contact";
import Credentials from "./homeComponents/credentials";
import Home from "./homeComponents/home";
import HomeScroll from "./homeComponents/home-scroll";
import Skills from "./homeComponents/skills";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function Page() {
  return (
    <HomeScroll
      sections={[
        { key: "About", children: <Home /> },
        { key: "Skills", children: <Skills /> },
        { key: "Credentials", children: <Credentials /> },
        { key: "Contact", children: <Contact /> }
      ]}
    />
  );
}
