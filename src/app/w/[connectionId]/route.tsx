import { NextRequest } from "next/server";
import { getUserToken } from "@/lib/kv";
import { getNowPlaying } from "@/lib/apple-music";

export const runtime = "edge";

interface AppleMusicItem {
  id: string;
  type: string;
  attributes: {
    artwork: {
      url: string;
    };
    // For tracks
    artistName?: string;
    name?: string;
    releaseDate?: string;
    genreNames?: string[];
    // For playlists
    curatorName?: string;
    lastModifiedDate?: string;
  };
}

interface AppleMusicResponse {
  next: string;
  data: AppleMusicItem[];
}

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

const escapeXml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/"/g, "&apos;");
};

const generateTextLines = (text: string, maxWidth: number, textWidth: number = 12, lineLimit: number = 3) => {
  const words = text.split(" ");
  let currentLine: string[] = [];
  const lines: string[][] = [];
  
  words.forEach(word => {
    const wordWidth = word.length * textWidth; // Use configurable text width
    if (currentLine.length > 0 && 
        (currentLine.join(" ").length * textWidth + wordWidth) > maxWidth) {
      lines.push(currentLine);
      currentLine = [word];
    } else {
      currentLine.push(word);
    }
  });
  
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  // Use configurable line limit
  const limitedLines = lines.slice(0, lineLimit);
  if (lines.length > lineLimit) {
    // Add ellipsis to the last line if it"s not empty
    if (limitedLines[lineLimit - 1].length > 0) {
      limitedLines[lineLimit - 1] = limitedLines[lineLimit - 1].slice(0, -1);
      limitedLines[lineLimit - 1].push("...");
    }
  }
  
  return limitedLines.map((line, lineIndex) => 
    `<tspan x="180" dy="${lineIndex === 0 ? 0 : 20}">${escapeXml(line.join(" "))}</tspan>`
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
        href="${escapeXml(songData.albumArt)}"
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
      <text x="180" y="42" font-family="GT America, sans-serif" font-size="14" dominant-baseline="middle" fill="${textColor}">
        ${generateTextLines(songData.artist, maxWidth, 6, 2)}
      </text>
      <text x="180" y="84" font-family="GT America, sans-serif" font-size="17" dominant-baseline="middle" fill="${textColor}">
        ${generateTextLines(songData.title, maxWidth, 8, 3)}
      </text>
      <text x="180" y="142" font-family="GT America, sans-serif" font-size="14" dominant-baseline="middle" fill="${textColor}">
        ${escapeXml(songData.year)}
      </text>
      <text x="180" y="160" font-family="GT America, sans-serif" font-size="14" dominant-baseline="middle" fill="${textColor}">
        ${escapeXml(songData.genre)}
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

  try {
    const nowPlaying = await getNowPlaying(userToken) as AppleMusicResponse;
    const recentItem = nowPlaying.data[0];
    
    if (!recentItem) {
      return new Response("No recent items found", { status: 404 });
    }

    const isPlaylist = recentItem.type === "playlists";
    const artist = isPlaylist ? recentItem.attributes.curatorName : recentItem.attributes.artistName;
    const title = recentItem.attributes.name;
    
    if (!artist || !title) {
      return new Response("Missing required fields", { status: 404 });
    }

    const songData = {
      albumArt: recentItem.attributes.artwork.url.replace("{w}", "360").replace("{h}", "360"),
      artist,
      title,
      year: isPlaylist 
        ? new Date(recentItem.attributes.lastModifiedDate || "").getFullYear().toString()
        : new Date(recentItem.attributes.releaseDate || "").getFullYear().toString(),
      genre: isPlaylist ? "Playlist" : (recentItem.attributes.genreNames?.[0] || "Unknown")
    };

    const config = getSVGConfig(size, theme);
    const svg = generateSVG(config, songData);

    return new Response(svg, {
      status: 200,
      headers: { 
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=180",
      },
    });
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return new Response("Error fetching now playing", { status: 500 });
  }
}
