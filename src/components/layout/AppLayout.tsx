"use client"

import styles from "./styles/app-layout.module.css";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.mainContent}>
      {children}
    </div>
  );
}
