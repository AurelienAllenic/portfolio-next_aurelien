import About from "@/components/About/About";
import styles from "./page.module.scss";
import CvLetter from "@/components/CvLetter/CvLetter";

export default function Home() {
  return (
    <div className={styles.page}>
      <About  />
      <CvLetter />
    </div>
  );
}
