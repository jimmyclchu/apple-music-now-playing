import styles from "./styles/AppSectionItem.module.css";

export default function AppSectionItem({ children }: { children: React.ReactNode }) {
  return <div className={styles.sectionItem}>{children}</div>;
}
