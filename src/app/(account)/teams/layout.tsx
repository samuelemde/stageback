import "@uploadthing/react/styles.css";
import "~/styles/globals.css";

export const metadata = {
  title: "StageBack",
  description: "The home for all your files",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
}
