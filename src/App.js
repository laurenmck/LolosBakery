import "./App.css";
import { useState, useEffect, hashmap } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem"
import Header from "./components/Header";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [cartM, setCartM] = useState(new Map());

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
    
    if(cartM.has(el.name)){
      let num = cartM.get(el.name)[0] + 1
      let price = num * el.price
      price = Math.round(price * 100) / 100;

      setCartM(cartM.set(el.name, [num, price]))
    } else 
     setCartM(cartM.set(el.name, [1, el.price]));

    console.log(cartM);
  };

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      {`${el.name}: $${el.price}`}
    </div>
  ));

  const cartItemsM = [...cartM.keys()].map(el => (
    <div key={el}>
        <div><span class="bold">{`${cartM.get(el)[0]} x`}</span>{` ${el}: $${cartM.get(el)[1]}`}</div>
    </div>
  ));

  const clearCart = () => {
    setCartM(new Map());
    setCart([]);
    setCartTotal = 0;
  }

  return (
    <div className="App">
     <Header/>
      <div class="container">
        <div class="items">
          {bakeryData.map((item, index) => ( //TODO: map bakeryData to BakeryItem components
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
        {/* <div class="yum">
          {[...cartM.keys()].map(k => (
              <div key={k}> {k} X {cartM.get(k)} <div class="right">{cartM.get(k)}</div></div>
           ))}
        </div> */}
        <div class="yum">{cartItemsM}</div>
        <div class="total">Total: ${cartTotal}</div>
        <button class="button-17" role="button" onClick={() => clearCart()}>Clear Cart</button>
      </div>
    </div>
    </div>
  );
}

export default App;
