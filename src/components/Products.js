import React from "react";

import donation from "../data/donation.json";

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

const Donation = () => {
  const { addItem, removeItem } = useShoppingCart();
  return (
    <section className="product">
      {donation.map((donation) => (
        <div key={donation.sku} className="donation">
          <img src={donation.image} alt={donation.name} />
          <h2>{donation.name}</h2>
          <p className="price">
            {formatCurrencyString({
              value: donation.price,
              currency: donation.currency,
            })}
          </p>
          <button onClick={() => addItem(donation)}>Pledge</button>
          <button onClick={() => removeItem(donation.sku)}>Remove</button>
        </div>
      ))}
    </section>
  );
};

export default Donation;
