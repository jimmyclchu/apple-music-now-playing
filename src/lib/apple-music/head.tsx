import { getRequestContext } from "@cloudflare/next-on-pages";

export function AppleMusicHead() {
  const { env } = getRequestContext();

  return (
    <>
      <script src="https://js-cdn.music.apple.com/musickit/v3/musickit.js" async></script>
      <meta name="apple-music-developer-token" content={env.NEXT_PUBLIC_APPLE_MUSIC_DEVELOPER_TOKEN} />
      <meta name="apple-music-app-name" content={env.NEXT_PUBLIC_APPLE_MUSIC_APP_NAME} />
      <meta name="apple-music-app-build" content="1.0.0" />
    </>
  );
}
