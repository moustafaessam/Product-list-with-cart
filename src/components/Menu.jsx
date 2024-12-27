import styles from "../styles/Menu.module.css";

function Menu({ children }) {
  return (
    <div className={styles.menu}>
      <h1 className={styles.menuHeader}>Desserts</h1>
      <div className={styles.items}>{children}</div>
    </div>
  );
}

export default Menu;
