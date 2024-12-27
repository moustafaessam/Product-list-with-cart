import { useContext, useEffect } from "react";
import styles from "../styles/ConfirmOrder.module.css";
import { MyContext } from "../App";

function ConfirmOrder({
  confirmOrderShown,
  setConfirmOrderShown,
  total,
  setItemNum,
}) {
  const { count, dispatch } = useContext(MyContext);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.modalBackground}>
      <div className={styles.confirmOrderMainBox}>
        <img src="/images/icon-order-confirmed.svg" alt="green tick" />
        <h1 className={styles.confirmOrderHeader}>Order Confirmed</h1>
        <p className={styles.confirmOrderEnjoyNote}>
          We hope you enjoy your food!
        </p>
        <div className={styles.confirmedItemsBox}>
          {count.map((e) =>
            e.count > 0 ? (
              <>
                <div className={styles.confirmedItem}>
                  <div>
                    <img
                      src={e.image.thumbnail}
                      alt={e.name}
                      className={styles.thumbnailImg}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <p>{e.name}</p>
                    <p>
                      <span className={styles.detailRed}>{e.count}x</span>{" "}
                      <span className={styles.detailRose}>
                        @{e.price.toFixed(2)}
                      </span>
                    </p>
                    <p></p>
                  </div>
                  <div className={styles.totalItemPrice}>
                    {(e.price * e.count).toFixed(2)}
                  </div>
                </div>
                <hr />
              </>
            ) : null
          )}
          <div className={styles.orderTotal}>
            <div className={styles.orderTotalSmall}>Order total</div>
            <div className={styles.orderTotalBold}>{total.toFixed(2)}</div>
          </div>
        </div>
        <button
          onClick={() => {
            setConfirmOrderShown((pre) => !pre);
            dispatch({ type: "reset" });
            setItemNum(0);
          }}
          className={styles.closeModalButton}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmOrder;
