import styles from "../styles/Cart.module.css";

function Cart() {
  return (
    <div className={styles.cartBox}>
      <h1 className={styles.cartHeader}>Your Cart (0)</h1>
      <div className={styles.centerEmptyCart}>
        <img src="/images/illustration-empty-cart.svg" alt="empty-cart" />
        <p>Your added items will appear here</p>
      </div>
    </div>
  );
}

export default Cart;
