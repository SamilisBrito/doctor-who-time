import styles from "./Tardis.module.scss";

export function Tardis({ start }) {
  return (
    <div
      className={`${styles.tardis} ${
        start && styles["tardis-seconds-before-traveling"]
      }`}
    >
      <div className={styles["top-base"]}>
        <div className={styles.triangle}></div>
        <div className={styles["top-lamp"]}></div>
        <div
          className={`${styles["middle-lamp"]} ${
            start && styles["middle-lamp-traveling"]
          }`}
        ></div>
        <div className={styles["base-lamp"]}></div>
        <div className={styles["top-top-first"]}></div>
        <div className={styles["top-top-middle"]}></div>
        <div className={styles["top-top-thin"]}></div>
        <div className={styles["top-top"]}></div>
        <div className={styles.body}>
          <div className={styles["window-left"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={styles["window-right"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={styles.base1}></div>
      <div className={styles.base2}></div>
    </div>
  );
}
