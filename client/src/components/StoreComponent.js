import React, { useState, useEffect } from "react";

const Store = () => {
  // const contextStoreItems = useContext(storeContext);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const ProductSeed = [
    //fetch to get product list from API - useEffect to come up on page load
    //map out items to individual item cards
    //post items in cart to API to get total on backend
    //Display total on front end.
    {
      //   _id: product1_id,
      _id: 1,
      name: "Barbell standard weight lifting plate, 2.5lbs",
      description:
        'These 1" weight plates come with openings in the plates making them easier and safer to grip. Customize your workout by adding or removing weights from your bar or dumbbell handle (sold separately). Whether you are using an adjustable dumbbell, barbell, or trap bar, these weights can be loaded onto any standard bar with a 1-inch sleeve diameter. These weights feature a machined center hole to easily slide onto bars. The baked enamel finish offers a durable, long-lasting coating to prevent rust and damage. The 3-hole grip design allows for easy handling when loading or unloading weights. Add these grip plates to your home gym and use them for cardiovascular fitness or strength training! Each weight is sold individually, so recommended to purchase in pairs.',
      price: 10,
      quantity: 60,
      image_path: "Barbell_weights_2.5lbs.jpeg",
    },
    {
      //   _id: product2_id,
      _id: 2,
      name: "Barbell standard weight lifting plate, 5lbs",
      description:
        "These weights feature a machined center hole to easily slide onto bars. The baked enamel finish offers a durable, long-lasting coating to prevent rust and damage. The 3-hole grip design allows for easy handling when loading or unloading weights. Add these grip plates to your home gym and use them for cardiovascular fitness or strength training! Each weight is sold individually, so recommended to purchase in pairs.",
      price: 30,
      quantity: 100,
      image_path: "Barbell_weights_5lbs.jpeg",
    },
  ];

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
  const listItems = ProductSeed.map((el) => (
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
