import { NextRequest } from "next/server";
import { getUserToken } from "@/lib/kv";

export const runtime = "edge";

interface SVGConfig {
  width: number;
  height: number;
  background: string;
  textColor: string;
  size: string;
  theme: string;
}

const getSVGConfig = (size: string, theme: string): SVGConfig => {
  const width = size === "banner" ? 360 : 180;
  const height = 180;
  const background = theme === "dark" ? "#1a1a1a" : "#f8f9fa";
  const textColor = theme === "dark" ? "#ffffff" : "#212529";

  return { width, height, background, textColor, size, theme };
};

const generateFontStyles = (fontPath: string) => `
  @font-face {
    font-family: "GT America";
    src: url("${fontPath}") format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  text {
    font-family: "GT America", sans-serif;
  }
`;

const generateTextLines = (text: string, maxWidth: number) => {
  const words = text.split(" ");
  let currentLine: string[] = [];
  const lines: string[][] = [];
  
  words.forEach(word => {
    const wordWidth = word.length * 9; // Approximate width of text
    if (currentLine.length > 0 && 
        (currentLine.join(" ").length * 9 + wordWidth) > maxWidth) {
      lines.push(currentLine);
      currentLine = [word];
    } else {
      currentLine.push(word);
    }
  });
  
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  return lines.map((line, lineIndex) => 
    `<tspan x="180" dy="${lineIndex === 0 ? 0 : 20}">${line.join(" ")}</tspan>`
  ).join("");
};

const generateSVG = (config: SVGConfig, songData: {
  albumArt: string;
  artist: string;
  title: string;
  year: string;
  genre: string;
}) => {
  const { width, height, background, textColor } = config;
  const fontPath = "/GT-America-Standard-Regular.woff2";
  const maxWidth = config.size === "banner" ? 160 : 80;

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          ${generateFontStyles(fontPath)}
        </style>
      </defs>
      <rect width="100%" height="100%" fill="${background}" rx="8" ry="8"/>
      <defs>
        <clipPath id="imageClip">
          <rect x="10" y="10" width="160" height="160" rx="5" ry="5"/>
        </clipPath>
      </defs>
      <image 
        href="${songData.albumArt}"
        x="10"
        y="10"
        width="160"
        height="160"
        preserveAspectRatio="xMidYMid slice"
        clip-path="url(#imageClip)"
      />
      <a href="https://now-playing.jimmyclchu.com" target="_blank">
        <text x="180" y="18" font-family="GT America, sans-serif" font-size="14" dominant-baseline="middle" fill="${textColor}" color="${textColor}">
          Now playing
        </text>
      </a>
      <text x="180" y="36" font-family="GT America, sans-serif" font-size="14" dominant-baseline="middle" fill="${textColor}">
        ${songData.artist}
      </text>
      <text x="180" y="73" font-family="GT America, sans-serif" font-size="17" dominant-baseline="middle" fill="${textColor}">
        ${generateTextLines(songData.title, maxWidth)}
      </text>
      <text x="180" y="142" font-family="GT America, sans-serif" font-size="14" dominant-baseline="middle" fill="${textColor}">
        ${songData.year}
      </text>
      <text x="180" y="160" font-family="GT America, sans-serif" font-size="14" dominant-baseline="middle" fill="${textColor}">
        ${songData.genre}
      </text>
    </svg>
  `.trim();
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ connectionId: string }> },
) {
  const id = (await params).connectionId;
  const userToken = await getUserToken(id);
  const searchParams = request.nextUrl.searchParams;
  const size = searchParams.get("size") || "banner";
  const theme = searchParams.get("theme") || "light";

  if (!userToken) {
    return new Response("No user token", { status: 404 });
  }

  const config = getSVGConfig(size, theme);
  
  // TODO: Replace with actual song data from your API
  const songData = {
    albumArt: "https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/3e/04/eb/3e04ebf6-370f-f59d-ec84-2c2643db92f1/196626945068.jpg/600x600bb.jpg",
    artist: "King Crimson",
    title: "Somewhere over the rainbow",
    year: "2023",
    genre: "Progressive Rock"
  };

  const svg = generateSVG(config, songData);

  return new Response(svg, {
    status: 200,
    headers: { 
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=180",
    },
  });
}
