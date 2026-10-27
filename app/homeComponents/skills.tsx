import Image from "next/image";

export default function Skills() {
  const iconPaths = [
    "/images/icons/typescript.png",
    "/images/icons/angular_gradient.png",
    "/images/icons/React-icon.png",
    "/images/icons/Figma-logo.svg",
    "/images/icons/Adobe_Photoshop_CC_icon.svg.png",
    "/images/icons/Python.png"
  ];

  return (
    <div className="w-full max-w-full flex justify-center px-1">
      <div className="grid grid-cols-3 gap-5 md:gap-8 justify-items-center">
        {iconPaths.map((src, i) => (
          <div
            key={i}
            className="w-16 h-16 md:w-24 md:h-24 relative filter grayscale hover:grayscale-0 transition duration-300 ease-in-out"
          >
            <Image
              src={src}
              alt={`Skill icon ${i + 1}`}
              fill
              sizes="(max-width: 768px) 64px, 96px"
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
