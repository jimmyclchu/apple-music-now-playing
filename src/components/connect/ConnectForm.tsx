import React, { FormEvent, useState } from "react";
import styles from "./styles/connect.module.css";

interface ConnectFormProps {
  isLoading: boolean;
  inputValue: string;
  response: string | null;
  setInputValue: (value: string) => void;
  handleConnect: (e: FormEvent) => Promise<void>;
}

export function ConnectForm({
  isLoading,
  response,
  handleConnect,
}: ConnectFormProps) {
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowSpinner(true);
    
    // Add 1s delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await handleConnect(e);
    setShowSpinner(false);
  };

  return (
    <div className={styles.formOverlay}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        {!showSpinner && !isLoading && (
          <button
            className={styles.button}
            type="submit"
            style={{ marginBottom: "1rem" }}
            disabled={isLoading || showSpinner}
          >
            Connect
          </button>
        )}
        {showSpinner && <div className={styles.spinner} />}
        {response && <div className={styles.responseContainer}>{response}</div>}
      </form>
    </div>
  );
} 
