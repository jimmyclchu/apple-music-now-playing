import React from "react";
import styles from "./styles/connect.module.css";

interface ConnectLayoutProps {
  children: React.ReactNode;
  showForm: boolean;
}

export function ConnectLayout({
  children,
  showForm,
}: ConnectLayoutProps) {
  return (
    <div
      className={`
        ${styles.connectWrapper}
        ${showForm ? styles.adjustHeight : ""}`
      }
      style={{
        position: "relative"
      }}
    >
      {children}
    </div>
  );
} 