import CardPage from "~/components/card-page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CardPage>{children}</CardPage>;
}
