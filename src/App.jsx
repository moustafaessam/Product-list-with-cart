import data from "./assets/data.json";
import Content from "./components/Content";
import Menu from "./components/Menu";
import Item from "./components/Item";
import Cart from "./components/Cart";
import { createContext, useReducer } from "react";

function countReducer(state, action) {
  switch (action.type) {
    case "increment":
      const incremented = [...state];
      incremented[action.itemNumber] += 1;
      return incremented;
    case "decrement":
      const decremented = [...state];
      if (decremented[action.itemNumber] > 0) {
        decremented[action.itemNumber] -= 1;
      }
      return decremented;
    default:
      return state;
  }
}

const MyContext = createContext();

function App() {
  const [count, dispatch] = useReducer(
    countReducer,
    new Array(data.length).fill(0)
  );
  console.log(count);
  return (
    <Content>
      <MyContext.Provider value={{ count, dispatch }}>
        <Menu>
          {data.map((e, i) => (
            <Item itemNumber={i} key={e.name} />
          ))}
        </Menu>
        <Cart />
      </MyContext.Provider>
    </Content>
  );
}

export { MyContext };
export default App;
