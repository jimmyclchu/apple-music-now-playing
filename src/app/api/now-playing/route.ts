import { getNowPlaying } from "@/lib/apple-music";
import { getUserToken } from "@/lib/kv";

export const runtime = "edge";

export async function GET(request: Request) {
  const connectionId = request.headers.get("x-connection-id");

  if (!connectionId) {
    return new Response("No connection id", { status: 400 });
  }

  if (!/^[0-9a-z]{10}$/.test(connectionId)) {
    return new Response("Invalid connection id", { status: 400 });
  }

  const userToken = await getUserToken(connectionId);
  if (!userToken) {
    return new Response("No user token", { status: 400 });
  }

  const nowPlaying = await getNowPlaying(userToken);

  return new Response(JSON.stringify(nowPlaying));
}
