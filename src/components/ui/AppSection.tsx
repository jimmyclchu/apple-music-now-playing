import styles from "./styles/AppSection.module.css";

export function AppSection({ children }: { children: React.ReactNode }) {
  return <div className={styles.section}>{children}</div>;
}
export function AppSectionHeader({ children }: { children: React.ReactNode }) {
  return <h2>{children}</h2>;
}

export function AppSectionBody({ children }: { children: React.ReactNode }) {
  return <div className={styles.sectionBody}>{children}</div>;
}
