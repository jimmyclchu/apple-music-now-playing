
import { gtAmericaMono, gtAmerica } from "@/lib/fonts";
import "./globals.css";

export { metadata } from "@/lib/metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`
      ${gtAmericaMono.className}
      ${gtAmerica.className}
    `}>
      <body>
        {children}
      </body>
    </html>
  );
}
