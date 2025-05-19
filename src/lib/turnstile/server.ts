"use server"

import { getSecretKey } from "./get-key";
interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

export async function validateTurnstile(
  token: string,
  remoteIp: string,
): Promise<{ success: boolean; errorMessage?: string }> {

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: getSecretKey(),
      response: token,
      remoteip: remoteIp,
    }),
  });

  const data = await response.json() as TurnstileResponse;

  return {
    success: data.success === true,
    errorMessage: data['error-codes']?.join(', ')
  };
}
