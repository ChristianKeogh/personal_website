export default function EducationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:relative md:left-1/2 md:w-[min(42rem,calc(100vw-3rem))] md:-translate-x-1/2">
      {children}
    </div>
  );
}
