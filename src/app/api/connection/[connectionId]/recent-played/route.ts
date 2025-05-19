import { getNowPlaying } from "@/lib/apple-music";
import { getUserToken } from "@/lib/kv";

export const runtime = "edge";
export const revalidate = 180;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ connectionId: string }> }
) {
  const { connectionId } = await params;

  if (!connectionId) {
    return new Response("No connection id", { status: 400 });
  }

  const userToken = await getUserToken(connectionId);
  if (!userToken) {
    return new Response("No user token", { status: 400 });
  }

  const nowPlaying = await getNowPlaying(userToken);

  return Response.json(nowPlaying);
}
