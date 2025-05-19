export async function getNowPlaying(userToken: string) {
  const endpoint = "https://api.music.apple.com/v1/me/recent/played?limit=1";

  const response = await fetch(`${endpoint}`, {
    headers: {
      "Authorization": `Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjQ4SkRNV0IyTFgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJDNlpTOU5ONTVTIiwiZXhwIjoxNzQ3NjU4NDg1LCJpYXQiOjE3NDc2MTUyODV9.IXzCnVvKihqJABXFnnZU4ktrKwooMurvDqRoW2TrTBnVd4YEm79jq-5eXk7zGh0WKF4lFRexG0IhUKFxUnHHuA`,
      "Music-User-Token": userToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch now playing.`);
  }

  const data = await response.json();

  return data;
}
