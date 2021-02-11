import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";

const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#000",
  padding: "2px 6px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
};

const buttonDisabledStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
};

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51IGRtjFE8xsP1GiTQZgQbL1IMYikfqZFnx5YipRPx9jHCikMEpWbpN5hdaqxH97d1RkCYZY6YuslLuns1KjBm7ng00prqfljz5"
    );
  }
  return stripePromise;
};

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState(1);

  const onChangeHandler = (event) => {
    setInputValue(parseInt(event.target.value));
  };

  const quantity = inputValue;

  const redirectToCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [
        {
          price: "price_1IJkXsFE8xsP1GiTFj0bK1yF",
          quantity: quantity,
        },
      ],
      successUrl: `http://localhost:8000/thank-you/`,
      cancelUrl: `http://localhost:8000/`,
    });

    if (error) {
      console.warn("Phakchen:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="number" onChange={onChangeHandler} value={inputValue} />
      <button
        disabled={loading}
        style={
          loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
        }
        onClick={redirectToCheckout}
      >
        Donate
      </button>
    </div>
  );
};

export default Checkout;
