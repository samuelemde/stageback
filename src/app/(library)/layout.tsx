import "@uploadthing/react/styles.css";
import "~/styles/globals.css";
import { Sidebar } from "~/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
