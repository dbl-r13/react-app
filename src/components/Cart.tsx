import React from "react";

interface CartProps {
  cartItems: string[];
  onClear: () => void;
}

const Cart = ({ cartItems, onClear }: CartProps) => {
  return (
    <>
      <h2>Cart</h2>
      <ul className="list-group">
        {cartItems.map((item) => (
          <li className="list-group-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
      <button onClick={onClear}>
        {cartItems.length > 0 ? "Clear" : "Refill"}
      </button>
    </>
  );
};

export default Cart;
