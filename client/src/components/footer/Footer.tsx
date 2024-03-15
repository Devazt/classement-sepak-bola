import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Klasemen</div>
      <div className={styles.text}>
        Nandy Septiana © 2024. All rights reserved
      </div>
    </div>
  );
}
