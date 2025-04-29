import About from "@/components/About/About";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <About  />
    </div>
  );
}
