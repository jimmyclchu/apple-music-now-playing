export async function getNowPlaying(userToken: string) {
  const response = await fetch("https://api.music.apple.com/v1/me/player/now-playing", {
    headers: {
      "Authorization": `Bearer ${userToken}`,
    },
  });
  return response.json();
}