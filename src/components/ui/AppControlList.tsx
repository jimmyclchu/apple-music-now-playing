import styles from "./styles/AppControlList.module.css";

export default function AppControlList({ children }: { children: React.ReactNode }) {
  return <div className={styles.controlList}>{children}</div>;
}
