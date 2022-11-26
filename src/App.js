import "./App.css";
import { useState, useEffect } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem"

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
  console.log(item.image);
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(Math.round(totalVal * 100) / 100);
  };

  const addToCart = (el) => {
    setCart([...cart, (el)]);
  };

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      {`${el.name}: $${el.price}`}
    </div>
  ));

  return (
    <div className="App">
      <h1>Lolo's Bakery</h1> {/* TODO: personalize your bakery (if you want) */}

      <div class="container">
        <div class="items">
          {bakeryData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
            <div class="bakery-item">
              {BakeryItem(item, index)}
              <div class="button">
                <button class="button-34" onClick={() => addToCart(item)}> Add to Cart </button>
              </div>
            </div>
          ))}
        </div>

      <div class="cart">
        <h2>Cart</h2>
        <div class="yum">{cartItems}</div>
        <div class="total">Total: ${cartTotal}</div>
      </div>
    </div>
    </div>
  );
}

export default App;
