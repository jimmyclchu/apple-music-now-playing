import { setUserToken } from "@/lib/kv";
import { nanoid } from "nanoid";

export const runtime = "edge";

interface TokenRequest {
  token: string;
  turnstileToken: string;
}

/*
interface TurnstileResponse {
  success: boolean;
  error_codes?: string[];
}
  */

export async function POST(request: Request) {
  console.log("haha")
  try {
    // Validate request body
    let body: TokenRequest;
    try {
      body = await request.json() as TokenRequest;
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    // Validate token presence
    if (!body.token || typeof body.token !== "string") {
      return new Response(JSON.stringify({ error: "Token is required and must be a string" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    /**
    // Validate Turnstile token
    if (!body.turnstileToken || typeof body.turnstileToken !== "string") {
      return new Response(JSON.stringify({ error: "Turnstile token is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    // Verify Turnstile token
    const turnstileResponse = await validateTurnstile(body.turnstileToken) as TurnstileResponse;
    if (!turnstileResponse.success) {
      return new Response(JSON.stringify({ 
        error: "Invalid Turnstile token",
        details: turnstileResponse.error_codes 
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    */

    // Generate a unique connection ID (you might want to use a more robust method)
    const connectionId = nanoid(10);
    console.log("connectionId", connectionId)

    // Set token in KV store
    await setUserToken(connectionId, body.token);
    
    return new Response(JSON.stringify({ connectionId }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error setting user token:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
