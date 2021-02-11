import React, { useState } from "react";

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import PaymentRequest from "./PaymentRequest";

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const {
    totalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  const handleCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { sessionId } = await fetch(
      "/.netlify/functions/create-checkout-session",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartDetails),
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    redirectToCheckout({ sessionId });
  };

  return (
    <div>
      <p>
        Total:{" "}
        {formatCurrencyString({
          value: totalPrice,
          currency: "USD",
        })}
      </p>

      <PaymentRequest />
      {/* Redirects the user to Stripe */}
      <button disabled={!cartCount || loading} onClick={handleCheckout}>
        Checkout
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default CartSummary;
