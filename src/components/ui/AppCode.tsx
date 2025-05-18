import styles from "./styles/AppCode.module.css";

export default function AppCode({ code }: { code: string }) {
  return <pre className={styles.code}>{code}</pre>;
}
