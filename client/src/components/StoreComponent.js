import React, { useState, useEffect } from "react";

const Store = () => {
  // const contextStoreItems = useContext(storeContext);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [productList, setProductList] = useState({ product: [] });

  useEffect(() => {
    const products = fetch("/api/store/productList");
    products
      .then((response) => response.json())
      .then((response) =>
        setProductList(() => {
          return { product: response };
        })
      );
  }, []);
  console.log(productList);
  //fetch to get product list from API - useEffect to come up on page load
  //map out items to individual item cards
  //post items in cart to API to get total on backend
  //Display total on front end.

  // Following object expected from front-end
  // {
  //   member_id:"",
  //   order_details:[{
  //     product_id:"",
  //     price:,
  //     quantity:
  //   },{
  //     product_id:"",
  //     price:,
  //     quantity:
  //   }],
  //   purchase_method:""
  // }

  useEffect(() => {
    total();
    // eslint-disable-next-line
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };
  const listItems = productList.product.map((el) => (
    <div key={el.id}>
      {`${el.name}: $${el.price}`}
      {/* Update input to add quantity */}
      {/* Check if quantity is more than zero.  If at zero, say "Out of stock" */}
      <input type="submit" value="add" onClick={() => addToCart(el)} />
    </div>
  ));
  const cartItems = cart.map((el) => (
    <div key={el.id}>
      {`${el.name}: $${el.price}`}
      <input type="submit" value="remove" onClick={() => removeFromCart(el)} />
    </div>
  ));

  return (
    <div>
      STORE
      <div>{listItems}</div>
      <div>CART</div>
      <div>{cartItems}</div>
      <div>Total: ${cartTotal}</div>
    </div>
  );
};

export default Store;
