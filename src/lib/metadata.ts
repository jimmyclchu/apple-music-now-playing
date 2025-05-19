import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Music Now Playing",
  description: "Find out what's playing on Apple Music with widget and API.",
  authors: [{ name: "Jimmy Chu", url: "https://jimmyclchu.com" }],
  creator: "Jimmy Chu",
  publisher: "Jimmy Chu",
  openGraph: {
    title: "Apple Music Now Playing",
    description: "Find out what's playing on Apple Music with widget and API.",
    images: [
      {
        url: "https://now-playing.jimmyclchu.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};
