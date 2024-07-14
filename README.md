# Apple Music Now Playing

This project lets you fetch and display the SVG image of the currently playing track from Apple Music.

## Demo

Check out the live demo:

<img src="https://apple-music-now-playing.vercel.app">

## Prerequisites

- Node 14
- npm
- An Apple Music developer token

## Setup

1. Clone the repo and install the dependencies:

    ```sh
    git clone https://github.com/your-username/apple-music-now-playing.git
    cd apple-music-now-playing
    npm install
    ```

2. Create a `.env` file in the root directory. We'll get back to `USER_TOKEN` later.

    ```
    DEVELOPER_TOKEN=your_developer_token
    USER_TOKEN=your_user_token
    ```

3. Build and start the client app to retrieve the Apple Music user token:

    ```sh
    npm run build:client
    npm run client
    ```

4. Open the client app and click "Login with Apple Music." After successful authentication, click "Check Authorization" to display the user token on the page.

5. Copy the user token and add it to `.env`.

6. Start the express server to display the SVG widget:

    ```sh
    npm run dev
    ```

7. Deploy to Vercel:

    ```sh
    vercel
    ```
