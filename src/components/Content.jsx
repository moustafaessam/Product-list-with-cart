import styles from "../styles/Content.module.css";

function Content({ children }) {
  return <div className={styles.contentMainBox}>{children}</div>;
}

export default Content;
