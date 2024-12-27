import styles from "../styles/Cart.module.css";
import { MyContext } from "../App";
import { useContext } from "react";

function Cart({ itemNum, setItemNum, setConfirmOrderShown, total }) {
  const { count, dispatch } = useContext(MyContext);

  return (
    <div className={styles.cartBox}>
      <h1 className={styles.cartHeader}>Your Cart ({itemNum})</h1>

      {itemNum <= 0 ? (
        <div className={styles.centerEmptyCart}>
          <img
            src="/images/illustration-empty-cart.svg"
            alt="empty-cart"
            className={styles.emptyCartImage}
          />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          {count.map((e, index) =>
            e.count > 0 ? (
              <div key={e.name} className={styles.itemBox}>
                <p className={styles.itemHeader}>{e.name}</p>
                <div className={styles.itemPriceBox}>
                  <p className={styles.count}>{e.count}x</p>
                  <p className={styles.price}>@ ${e.price.toFixed(2)}</p>
                  <p className={styles.totalPriceItem}>
                    ${(e.price * e.count).toFixed(2)}
                  </p>
                  <div
                    className={styles.removeItemImgContainer}
                    onClick={() => {
                      const total = e.count;
                      setItemNum((pre) => {
                        return pre - total;
                      });
                      dispatch({ type: "removeItem", index });
                    }}
                  >
                    <img
                      className={styles.removeItem}
                      src="/images/icon-remove-item.svg"
                    />
                  </div>
                </div>
                <hr className={styles.lineBreak} />
              </div>
            ) : null
          )}

          {total > 0 && (
            <>
              <div className={styles.orderTotalBox}>
                <p className={styles.orderTotal}>Order Total</p>
                <p className={styles.totalPrice}>${total.toFixed(2)}</p>
              </div>
              <div className={styles.carbonFreeNoteBox}>
                <img src="/images/icon-carbon-neutral.svg" alt="green tree" />
                <p>This is a carbon-neutral delivery</p>
              </div>
              <button
                className={styles.showModalButton}
                onClick={() => setConfirmOrderShown((pre) => !pre)}
              >
                Confirm Order
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
