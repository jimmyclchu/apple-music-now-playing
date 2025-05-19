import styles from "./styles/AppURL.module.css";
import { useEffect, useState } from "react";

export default function AppURL({
  url,
  onCopy,
}: {
  url: string,
  onCopy: () => void,
}) {
  const [characters, setCharacters] = useState<string[]>([]);

  useEffect(() => {
    // Split by empty string to preserve all characters including spaces
    setCharacters([...url]);
  }, [url]);

  return <div
    className={styles.url}
    onClick={onCopy}
  >
    <div className={styles.urlText}>
      {characters.map((char, index) => (
        <span 
          key={`${char}-${index}`} 
          className={styles.character}
          style={{ animationDelay: `${index * 0.005}s` }}
        >
          {char}
        </span>
      ))}
    </div>
    <div className={styles.tail}></div>
  </div>;
}
