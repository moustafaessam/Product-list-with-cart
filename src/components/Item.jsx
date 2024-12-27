import styles from "../styles/Item.module.css";
import data from "../assets/data.json";
import { useContext, useState } from "react";
import { MyContext } from "../App";

function Item({ itemNumber }) {
  const { count, dispatch } = useContext(MyContext);
  const [isHovered, setHovered] = useState(false);

  return (
    <div className={styles.itemBox}>
      <div className={styles.imgBox}>
        <picture>
          <source
            media="(max-width: 420px)"
            srcSet={data[itemNumber].image.mobile}
          />
          <source
            media="(max-width: 768px)"
            srcSet={data[itemNumber].image.tablet}
          />
          <img
            src={data[itemNumber].image.desktop}
            alt={data[itemNumber].name}
            className={styles.img}
          />
        </picture>
        {isHovered ? (
          <div
            onMouseLeave={() => setHovered(false)}
            className={styles.addToCartHovered}
          >
            <div
              className={styles.cartModifyBox}
              onClick={() => dispatch({ type: "decrement", itemNumber })}
            >
              <img src="/images/icon-decrement-quantity.svg" />
            </div>
            {count[itemNumber]}
            <div
              className={styles.cartModifyBox}
              onClick={() => dispatch({ type: "increment", itemNumber })}
            >
              <img src="/images/icon-increment-quantity.svg" />
            </div>
          </div>
        ) : (
          <div
            className={styles.addToCart}
            onMouseEnter={() => setHovered(true)}
          >
            <img src="/images/icon-add-to-cart.svg" alt="add to cart" />
            Add to cart
          </div>
        )}
      </div>
      <p className={styles.category}>{data[itemNumber].category}</p>
      <p>{data[itemNumber].name}</p>
      <p className={styles.price}>{data[itemNumber].price.toFixed(2)}</p>
    </div>
  );
}

export default Item;
