const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export async function validateTurnstile(token: string) {
  const response = await fetch(TURNSTILE_URL, {
    method: "POST",
    body: JSON.stringify({
      secret: TURNSTILE_SECRET_KEY,
      response: token,
    }),
  });
  return response.json();
}
