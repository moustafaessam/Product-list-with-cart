import data from "./assets/data.json";
import Content from "./components/Content";
import Menu from "./components/Menu";
import Item from "./components/Item";
import Cart from "./components/Cart";
import ConfirmOrder from "./components/ConfirmOrder";
import { createContext, useReducer, useState } from "react";

function countReducer(state, action) {
  switch (action.type) {
    case "increment":
      const incremented = [...state];
      incremented[action.itemNumber].count += 1;
      incremented[action.itemNumber].totalPrice +=
        incremented[action.itemNumber].price;
      return incremented;
    case "decrement":
      const decremented = [...state];
      if (decremented[action.itemNumber].count > 0) {
        decremented[action.itemNumber].count -= 1;
        decremented[action.itemNumber].totalPrice -=
          decremented[action.itemNumber].price;
      }
      return decremented;
    case "reset":
      return data.map((e) => {
        return { count: 0, ...e, totalPrice: 0 };
      });
    case "removeItem":
      const itemRemoved = [...state];
      itemRemoved[action.index].count = 0;
      return itemRemoved;
    default:
      return state;
  }
}

const MyContext = createContext();

function App() {
  const newData = data.map((e) => {
    return { count: 0, ...e, totalPrice: 0 };
  });
  const [count, dispatch] = useReducer(countReducer, newData);
  const [itemNum, setItemNum] = useState(0);
  const [confirmOrderShown, setConfirmOrderShown] = useState(false);
  const total = count.reduce((acc, cv) => {
    if (cv.count > 0) {
      return acc + cv.price * cv.count; // Add the price of items with count > 0
    }
    return acc;
  }, 0);

  console.log(count);
  return (
    <Content>
      <MyContext.Provider value={{ count, dispatch }}>
        <Menu>
          {data.map((e, i) => (
            <Item
              itemNumber={i}
              key={e.name}
              itemNum={itemNum}
              setItemNum={setItemNum}
            />
          ))}
        </Menu>
        <Cart
          itemNum={itemNum}
          setItemNum={setItemNum}
          setConfirmOrderShown={setConfirmOrderShown}
          total={total}
        />
        {confirmOrderShown ? (
          <ConfirmOrder
            setConfirmOrderShown={setConfirmOrderShown}
            confirmOrderShown={confirmOrderShown}
            total={total}
            setItemNum={setItemNum}
          />
        ) : null}
      </MyContext.Provider>
    </Content>
  );
}

export { MyContext };
export default App;
