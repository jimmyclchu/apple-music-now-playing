"use client"

import Link from "next/link";
import styles from "./styles/header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <span>Apple Music</span>
        <span>Now Playing</span>
      </h1>
      <p className={styles.description}>
        Find out what&apos;s playing with widget and API.
      </p>
      <div className={styles.links}>
        <Link 
          href="https://github.com/jimmyclchu/apple-music-now-playing"
          className={styles.link}
          target="_blank"
        >
          GitHub
        </Link>
      </div>
    </header>
  );
}
