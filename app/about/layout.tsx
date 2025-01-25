export const metadata = {
  title: "About",
  description: "About me"
};

export default function AboutLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
