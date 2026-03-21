import styles from "./LoadingScreen.module.css";

function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}

export default LoadingScreen;
