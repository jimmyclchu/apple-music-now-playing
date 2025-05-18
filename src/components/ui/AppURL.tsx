import styles from "./styles/AppURL.module.css";

export default function AppURL({
  url,
  onCopy,
}: {
  url: string,
  onCopy: () => void,
}) {
  return <div
    className={styles.url}
    onClick={onCopy}
  >
    <div className={styles.urlText}>
      {url}
    </div>
    <div className={styles.tail}></div>
  </div>;
}
