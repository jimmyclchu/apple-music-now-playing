export async function getNowPlaying(userToken: string) {
  const endpoint = "https://api.music.apple.com/v1/me/recent/played?limit=1";

  const response = await fetch(`${endpoint}`, {
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_APPLE_MUSIC_DEVELOPER_TOKEN}`,
      "Music-User-Token": userToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch now playing.`);
  }

  const data = await response.json();

  return data;
}
