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
      "pk_live_51IGRtjFE8xsP1GiTLfkRMLZ4Ii0MBgWq2MhMtjf2shKH1cNoOQZmiSxcRX1lThUFYooTKkJK3JWv4d0ZY0QCNDB800XYZAVPRA"
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

  const redirectToCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [
        {
          price: "price_1IIo5IFE8xsP1GiTIeBjrCPc",
          quantity: quantity,
        },
      ],
      successUrl: `https://humans4health.netlify.app/thank-you-donation/`,
      cancelUrl: `https://humans4health.netlify.app/`,
      submitType: "donate",
    });

    if (error) {
      console.warn("Phakchen:", error);
      setLoading(false);
    }
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
        onClick={redirectToCheckout}
      >
        Donate
      </button>
    </div>
  );
};

export default Checkout;
