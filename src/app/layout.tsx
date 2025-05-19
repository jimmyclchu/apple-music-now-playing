import { AppleMusicHead } from "@/lib/apple-music/head";
import { gtAmericaMono, gtAmerica } from "@/lib/fonts";
import "./globals.css";

export { metadata } from "@/lib/metadata";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`
      ${gtAmericaMono.className}
      ${gtAmerica.className}
    `}>
      <head>
        <AppleMusicHead />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
