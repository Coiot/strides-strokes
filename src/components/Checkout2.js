import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";

const buttonStyles = {
  fontSize: "0.88889em",
  fontWeight: "800",
  textAlign: "center",
  color: "#fff",
  padding: "0.75em 1.875em",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "#f14842",
  border: "0",
  borderRadius: "5px",
  letterSpacing: "1.5px",
  transition: "0.25s ease",
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

  const [inputText, setInputText] = useState("");

  const onChangeHandler = (event) => {
    setInputValue(parseInt(event.target.value));
  };

  const onChangeText = (event) => {
    setInputText(event.target.value);
  };

  const quantity = inputValue;

  const text = inputText;

  const handleCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { sessionId } = await fetch(
      "../../functions/create-checkout-session",
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
      <input type="text" onChange={onChangeText} value={inputText} />
      <input type="number" onChange={onChangeHandler} value={inputValue} />
      <button
        disabled={loading}
        style={
          loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
        }
        onClick={handleCheckout}
      >
        Donate
      </button>
    </div>
  );
};

export default Checkout;
