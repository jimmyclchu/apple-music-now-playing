import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const DEVELOPER_TOKEN = process.env.DEVELOPER_TOKEN;
const USER_TOKEN = process.env.USER_TOKEN;

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://api.music.apple.com/v1/me/recent/played', {
      headers: {
        Authorization: `Bearer ${DEVELOPER_TOKEN}`,
        'Music-User-Token': USER_TOKEN,
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ error: 'Failed to fetch now playing' });
      return;
    }

    const data = await response.json();
    if (data && data.data && data.data.length > 0) {
      const nowPlaying = data.data[0];
      const type = nowPlaying.type;
      const trackName = nowPlaying.attributes.name;
      const albumName = nowPlaying.attributes.albumName;
      const artistName = nowPlaying.attributes.artistName;
      const trackCount = nowPlaying.attributes.trackCount;
      const releaseDate = nowPlaying.attributes.releaseDate;
      const releaseYear = releaseDate.split('-')[0];

      const albumArtUrl = nowPlaying.attributes.artwork.url.replace('{w}', '1000').replace('{h}', '1000');
      const bgColor = hexToFeColorMatrix(nowPlaying.attributes.artwork.bgColor);
      const textColor1 = hexToFeColorMatrix(nowPlaying.attributes.artwork.textColor1);
      const textColor2 = hexToFeColorMatrix(nowPlaying.attributes.artwork.textColor2);
      const textColor3 = hexToFeColorMatrix(nowPlaying.attributes.artwork.textColor3);
      const textColor4 = hexToFeColorMatrix(nowPlaying.attributes.artwork.textColor4);

      const svgContent = `
        <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Inter");
          </style>

          <g clip-path="url(#clip0)">
            <g clip-path="url(#clip1)">
              <rect width="453.105" height="283.191" transform="translate(-33.3298 -83.3333) rotate(0.675117)" fill="white"/>
              <g filter="url(#filter0)">
                <path d="M398.378 10.5451C426.567 17.5066 428.91 -10.96 451.611 -14.6016C532.257 -27.5382 537.608 166.296 454.453 194.53C375.781 221.241 296.959 61.4034 296.959 61.4034C296.959 61.4034 281.861 19.1246 297.656 2.28303C311.91 -12.916 330.254 -11.9555 350.315 -6.31951C366.164 -1.86677 382.396 6.59811 398.378 10.5451Z" fill="white"/>
              </g>
              <g filter="url(#filter1)">
                <ellipse cx="310.725" cy="154.805" rx="134.632" ry="134.481" transform="rotate(0.675117 310.725 154.805)" fill="#0038FF"/>
              </g>
              <g filter="url(#filter2)">
                <ellipse cx="-30.4342" cy="99.9736" rx="107.344" ry="107.193" transform="rotate(0.675117 -30.4342 99.9736)" fill="white"/>
              </g>
              <g filter="url(#filter3)">
                <path d="M-60.9815 33.3092C-76.5976 78.2335 -83.6025 112.525 -62.4167 155.101C-21.1119 238.109 130.303 239.242 174.79 157.896C209.952 93.6023 160.346 41.0096 124.541 -22.9263C108.743 -51.1378 104.835 -74.5381 76.7518 -90.5282C13.9084 -126.31 -37.2213 -35.0444 -60.9815 33.3092Z" fill="#F54D61"/>
              </g>
              <g style="mix-blend-mode:hue" filter="url(#filter4)">
                <path d="M324.214 -72.0777C376.126 -58.9124 380.458 -112.819 422.271 -119.729C570.807 -144.276 580.545 222.774 427.377 276.289C282.466 326.918 137.395 24.2917 137.395 24.2917C137.395 24.2917 109.614 -55.76 138.714 -87.6615C164.977 -116.452 198.761 -114.644 235.704 -103.984C264.891 -95.5616 294.781 -79.5421 324.214 -72.0777Z" fill="#1DA2B5"/>
              </g>
            </g>
          </g>
          <defs>
            <filter id="filter0" x="133.122" y="-172.549" width="538.702" height="527.417" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="78.6641" result="effect1_foregroundBlur"/>
              <feColorMatrix type="matrix" values="${bgColor}" result="effect2_colorMatrix"/>
              <feBlend mode="normal" in="effect2_colorMatrix" in2="effect1_foregroundBlur" result="finalEffect"/>
            </filter>
            <filter id="filter1" x="-12.7014" y="-168.471" width="646.852" height="646.551" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="94.397" result="effect1_foregroundBlur"/>
              <feColorMatrix type="matrix" values="${textColor1}" result="effect2_colorMatrix"/>
              <feBlend mode="normal" in="effect2_colorMatrix" in2="effect1_foregroundBlur" result="finalEffect"/>
            </filter>
            <filter id="filter2" x="-295.106" y="-164.548" width="529.344" height="529.043" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="78.6641" result="effect1_foregroundBlur"/>
              <feColorMatrix type="matrix" values="${textColor2}" result="effect2_colorMatrix"/>
              <feBlend mode="normal" in="effect2_colorMatrix" in2="effect1_foregroundBlur" result="finalEffect"/>
            </filter>
            <filter id="filter3" x="-233.006" y="-255.896" width="577.156" height="631.365" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="78.6641" result="effect1_foregroundBlur"/>
              <feColorMatrix type="matrix" values="${textColor3}" result="effect2_colorMatrix"/>
              <feBlend mode="normal" in="effect2_colorMatrix" in2="effect1_foregroundBlur" result="finalEffect"/>
            </filter>
            <filter id="filter4" x="12.1536" y="-234.182" width="639.154" height="629.459" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="56.6382" result="effect1_foregroundBlur"/>
              <feColorMatrix type="matrix" values="${textColor4}" result="effect2_colorMatrix"/>
              <feBlend mode="normal" in="effect2_colorMatrix" in2="effect1_foregroundBlur" result="finalEffect"/>
            </filter>
            <clipPath id="clip0">
              <rect y="170" width="170" height="400" rx="12" transform="rotate(-90 0 170)" fill="white"/>
            </clipPath>
            <clipPath id="clip1">
              <rect width="453.105" height="283.191" fill="white" transform="translate(-33.3298 -83.3333) rotate(0.675117)"/>
            </clipPath>
          </defs>

          <defs>
            <clipPath id="rounded-corners">
              <rect x="15" y="15" width="140" height="140" rx="10" ry="10" />
            </clipPath>
          </defs>
          <image x="15" y="15" href="${albumArtUrl}" height="140" width="140" clip-path="url(#rounded-corners)" />
          
          <text x="175" y="36" font-family="Inter" font-size="16" fill="rgba(220, 220, 220, 1)">Now playing: ${type}</text>
          <text x="175" y="60" font-family="Inter" font-size="16" fill="rgba(255, 255, 255, 0.8)">${trackName}</text>
          <text x="175" y="84" font-family="Inter" font-size="16" fill="rgba(255, 255, 255, 0.8)">${artistName}</text>
          <text x="175" y="146" font-family="Inter" font-size="16" fill="rgba(255, 255, 255, 0.8)">${releaseYear}・${trackCount} tracks</text>
        </svg>
      `;
      res.setHeader('Content-Type', 'image/svg+xml');
      res.send(svgContent);
    } else {
      res.status(404).json({ error: 'No data available' });
    }
  } catch (error) {
    console.error('Error fetching now playing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function hexToFeColorMatrix(hex) {
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  let matrixValues = `
    ${r} 0 0 0 0
    0 ${g} 0 0 0
    0 0 ${b} 0 0
    0 0 0 1 0
  `;

  return matrixValues;
}