# Apple Music Now Playing

A Next.js application that displays your current Apple Music playback status with a SVG widget and API.

## Demo

- Main Application: https://now-playing.jimmyclchu.com
- Widget: https://now-playing.jimmyclchu.com/w/O7RMtKQhqL
- API:
  ```bash
  curl https://now-playing.jimmyclchu.com/api/connection/Abs7rN0gwt/recent-played
  ```

## Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Cloudflare account (for deployment)
- Apple Developer account

## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:jimmyclchu/apple-music-now-playing.git
   cd apple-music-now-playing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `wrangler.jsonc.example` to `wrangler.jsonc` and `.env.example` to `.env`
   - Replace the following variables in `wrangler.jsonc` and `.env`:
     - `<KV_ID>`: Your Cloudflare KV namespace ID
     - `<TURNSTILE_SECRET_KEY>`: Your Cloudflare Turnstile secret key
     - `<TURNSTILE_SITE_KEY>`: Your Cloudflare Turnstile site key
     - `<APPLE_MUSIC_DEVELOPER_TOKEN>`: Your Apple Music developer token
     - `<APPLE_MUSIC_APP_NAME>`: Your Apple Music app name

   To get these values:
   - KV_ID: Create a KV namespace in Cloudflare and copy its ID
   - Turnstile keys: Create a site in Cloudflare Turnstile and get the keys
   - Apple Music credentials: Set up an app in Apple Developer portal

4. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Deployment

This project is configured for deployment to Cloudflare Pages. To deploy:

1. Ensure you have the Cloudflare Wrangler CLI installed
2. Configure your Cloudflare credentials in `wrangler.jsonc`
3. Run:
   ```bash
   npm run deploy
   ```

## Technologies Used

![Architecture Diagram](/public/diagram.png)

- Next.js
- TypeScript
- Cloudflare Pages
- Cloudflare KV
- Cloudflare Turnstile
- MusicKit
- Apple Music API

## License

MIT
