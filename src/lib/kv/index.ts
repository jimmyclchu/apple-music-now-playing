import { getRequestContext } from "@cloudflare/next-on-pages";

const PREFIX = "token";

export async function getUserToken(connectionId: string) {
  const myKv = getRequestContext().env.APPLE_MUSIC_NOW_PLAYING_KV;
  const value = await myKv.get(`${PREFIX}:${connectionId}`);
  return value;
}

export async function setUserToken(connectionId: string, token: string) {
  const myKv = getRequestContext().env.APPLE_MUSIC_NOW_PLAYING_KV;
  await myKv.put(`${PREFIX}:${connectionId}`, token);
}

export async function deleteUserToken(connectionId: string) {
  const myKv = getRequestContext().env.APPLE_MUSIC_NOW_PLAYING_KV;
  await myKv.delete(`${PREFIX}:${connectionId}`);
}
