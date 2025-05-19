/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState, useEffect, useRef } from "react";
import styles from "./styles/connect.module.css";
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { getSiteKey } from "@/lib/turnstile/get-key";

declare global {
  interface Window {
    MusicKit: any;
  }
}

interface ConnectFormProps {
  isLoading: boolean;
  inputValue: string;
  response: string | null;
  setInputValue: (value: string) => void;
  handleConnect: (e: FormEvent, turnstileToken: string | null) => Promise<void>;
}

export function ConnectForm({
  isLoading,
  response,
  handleConnect,
}: ConnectFormProps) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [musicKitLoaded, setMusicKitLoaded] = useState(false);
  const [musicKitInstance, setMusicKitInstance] = useState<any>(null);
  const turnstileRef = useRef<TurnstileInstance>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileVerified, setTurnstileVerified] = useState<boolean>(false)

  useEffect(() => {
    const handleMusicKitLoaded = async () => {
      try {
        const instance = window.MusicKit.getInstance();

        setMusicKitInstance(instance);
        setMusicKitLoaded(true);
      } catch (error) {
        console.error("Failed to configure MusicKit:", error);
      }
    };

    if (window.MusicKit) {
      handleMusicKitLoaded();
    }

    window.addEventListener("musickitloaded", handleMusicKitLoaded);

    return () => {
      window.removeEventListener("musickitloaded", handleMusicKitLoaded);
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowSpinner(true);

    if (!musicKitLoaded || !musicKitInstance) {
      setShowSpinner(false);
      return;
    }

    try {
      await musicKitInstance.authorize();
      
      if (musicKitInstance.isAuthorized) {
        await handleConnect(e, turnstileToken);
      }
    } catch (error) {
      console.error("Authorization error:", error);
    } finally {
      setShowSpinner(false);
    }
  };

  return (
    <div className={styles.formOverlay}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

      {!showSpinner && (
        <Turnstile
          ref={turnstileRef}
          siteKey={getSiteKey()}
        onSuccess={token => {
          setTurnstileToken(token);
          setTurnstileVerified(true);
          }}
        />
      )}
        
        {!showSpinner && !isLoading && (
          <button
            className={styles.button}
            type="submit"
            style={{ marginBottom: "1rem" }}
            disabled={isLoading || showSpinner || !musicKitLoaded || !turnstileVerified}
          >
            {turnstileVerified ? "Connect" : "Verifying..."}
          </button>
        )}
        {showSpinner && <div className={styles.spinner} />}
        {response && <div className={styles.responseContainer}>{response}</div>}
      </form>
    </div>
  );
} 
