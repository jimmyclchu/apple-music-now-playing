import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Music Now Playing",
  description: "Share your Apple Music now playing.",
  authors: [{ name: "Jimmy Chu", url: "https://jimmyclchu.com" }],
  creator: "Jimmy Chu",
  publisher: "Jimmy Chu",
  openGraph: {
    title: "Apple Music Now Playing",
    description: "Share your Apple Music now playing.",
    images: [
      {
        url: "https://now-playing.jimmyclchu.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};
