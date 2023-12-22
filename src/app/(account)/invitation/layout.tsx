import CardPage from "~/components/card-page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CardPage>
      <h1 className="text-center text-3xl font-bold text-accent-foreground">
        Invitation
      </h1>
      {children}
    </CardPage>
  );
}
