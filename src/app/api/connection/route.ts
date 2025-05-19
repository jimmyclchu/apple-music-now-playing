import { setUserToken } from "@/lib/kv";
import { nanoid } from "nanoid";
import { validateTurnstile } from "@/lib/turnstile/server";
export const runtime = "edge";

interface TokenRequest {
  token: string;
  turnstileToken: string;
  remoteIp?: string;
}

export async function POST(request: Request) {
  console.log("[Connection] Received new connection request");

  // resolve body as json
  let body: TokenRequest;
  try {
    body = await request.json() as TokenRequest;
    console.log("[Connection] Request body parsed successfully");
    console.log("body", body)
  } catch (error) {
    console.error("[Connection] Failed to parse request body:", error);
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  // Validate token presence
  if (!body.token || typeof body.token !== "string") {
    console.error("[Connection] Invalid token in request:", { token: body.token });
    return new Response(JSON.stringify({ error: "Token is required and must be a string" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  // Verify Turnstile token
  console.log("[Connection] Validating Turnstile token");
  console.log("body.turnstileToken", body.turnstileToken)
  const turnstileResponse = await validateTurnstile(body.turnstileToken, "");
  if (!turnstileResponse.success) {
    console.error("[Connection] Turnstile validation failed:", turnstileResponse.errorMessage);
    return new Response(JSON.stringify({ 
      error: "Invalid Turnstile token",
      details: turnstileResponse.errorMessage 
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  console.log("[Connection] Turnstile validation successful");

  // Generate a unique connection ID
  const connectionId = nanoid(10);
  console.log("[Connection] Generated connection ID:", connectionId);

  try {
    // Set token in KV store
    await setUserToken(connectionId, body.token);
    console.log("[Connection] Successfully stored token for connection:", connectionId);
    
    return new Response(JSON.stringify({ connectionId }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("[Connection] Error setting user token:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
