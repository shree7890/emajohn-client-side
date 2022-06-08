import React from "react";
import "./Cart.css";
const Cart = (props) => {
  const { cart } = props;
  let total = 0;
  let quantity = 0;
  for (const pro of cart) {
    if (!pro.quantity) {
      pro.quantity = 1;
    }
    quantity = quantity + pro.quantity;
    total = total + pro.price * pro.quantity;
  }
  const shipping = total > 0 ? 15 : 0;
  const tax = (total + shipping) * 0.1;
  const grandTotal = total + shipping + tax;
  return (
    <div>
      <div>
        <h2>cart added</h2>
        <h4>totalQuan:{quantity}</h4>
        <h4>price:{total.toFixed(2)}</h4>
        <h4>shipping:{shipping}</h4>
        <h4>tax:{tax.toFixed(2)}</h4>
        <h4>grandtotal:{grandTotal.toFixed(2)}</h4>
        <div className="mt-4">{props.children}</div>
      </div>
    </div>
  );
};

export default Cart;
