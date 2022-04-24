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
  margin: "1.5em 0 0 0",
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

  const [inputQuantityValue, setInputQuantityValue] = useState(1);

  const onChangeQuantityHandler = (event) => {
    setInputQuantityValue(parseInt(event.target.value));
  };

  const [inputGymValue, setInputGymValue] = useState("price_1IIo5IFE8xsP1GiTIeBjrCPc");

  const onChangeGymHandler = (event) => {
    setInputGymValue(parseInt(event.target.value));
  };

  const [inputText, setInputText] = useState("");

  const onChangeText = (event) => {
    setInputText(event.target.value);
  };

  const price_id = inputGymValue.toString();

  const quantity = inputQuantityValue;

  const text = inputText;

  const redirectToCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [
        {
          price: price_id,
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
    <>
      <label for="gym-select">Choose a Gym:</label>
      <div className="form-select">
      <select name="gyms" id="gym-select" className="mb-4">
        <option onChange={onChangeGymHandler} value="price_1IIo5IFE8xsP1GiTIeBjrCPc">--Please select a Gym--</option>
        <option onChange={onChangeGymHandler} value="price_1Ks86vFE8xsP1GiTneZHfSO7">OrangeTheory - Winter Park</option>
        <option onChange={onChangeGymHandler} value="price_1Ks87xFE8xsP1GiTmDw5Dkje">OrangeTheory - Oviedo</option>
        <option onChange={onChangeGymHandler} value="price_1Ks88GFE8xsP1GiTBKaCks1h">OrangeTheory - Altamonte Springs</option>
        <option onChange={onChangeGymHandler} value="price_1Ks88YFE8xsP1GiTcMwYQXek">OrangeTheory - Lake Mary</option>
        <option onChange={onChangeGymHandler} value="price_1Ks88oFE8xsP1GiTLTXABWkc">OrangeTheory - Orlando-SODO</option>
        <option onChange={onChangeGymHandler} value="price_1Ks894FE8xsP1GiTMBmHGdaa">OrangeTheory - Colonial Plaza</option>
      </select>
      </div>

      <label for="price-select">Donation Amount::</label>
      <input id="price-select" type="number" onChange={onChangeQuantityHandler} value={inputQuantityValue} className="mb-2"/>

      <button
        disabled={loading}
        style={
          loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
        }
        onClick={redirectToCheckout}
      >
        Proceed
      </button>
    </>
  );
};

export default Checkout;
