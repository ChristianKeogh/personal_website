import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties, ReactNode } from "react";
import { highlight } from "sugar-high";

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

function CustomLink({ href, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return <Link {...props} href={href} />;
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

interface RoundedImageProps extends React.ComponentProps<typeof Image> {
  alt: string;
}

function RoundedImage({ alt, ...props }: RoundedImageProps) {
  return <Image alt={alt} className="rounded-lg" {...props} />;
}

type MDXImgProps = {
  src?: string;
  alt?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  style?: CSSProperties;
  className?: string;
};

function MDXImg({ src, alt = "", title, width, height, style, className }: MDXImgProps) {
  if (!src) return null;

  const numericWidth =
    typeof width === "number"
      ? width
      : typeof width === "string" && /^\d+$/.test(width)
        ? Number(width)
        : 800;
  const numericHeight =
    typeof height === "number"
      ? height
      : typeof height === "string" && /^\d+$/.test(height)
        ? Number(height)
        : 500;

  return (
    <Image
      src={src}
      alt={alt}
      title={title}
      width={numericWidth}
      height={numericHeight}
      sizes="(max-width: 768px) 100vw, 700px"
      className={className ?? "rounded-lg h-auto w-full"}
      style={style}
    />
  );
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: string;
}

function Code({ children, ...props }: CodeProps) {
  let codeHTML = highlight(children) || "";
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Heading: React.FC<{ children: ReactNode }> = ({ children }) => {
    let slug = slugify(children?.toString() || "");
    return React.createElement(
      `h${level}`,
      { id: slug },
      React.createElement("a", {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: "anchor"
      }),
      children
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  img: MDXImg,
  a: CustomLink,
  code: Code
};

interface CustomMDXProps extends MDXRemoteProps {
  components?: MDXRemoteProps["components"];
}

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
