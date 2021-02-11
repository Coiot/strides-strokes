import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "../components/App";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "use-shopping-cart";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

import components, { Layout } from "../components/index";

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: { eq: $url }) {
      id
    }
  }
`;

export default class Donations extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <Elements stripe={stripePromise}>
          <CartProvider
            mode="checkout-session"
            stripe={stripePromise}
            currency="USD"
          >
            <Router>
              <header>
                <Link to="/">Serverless Shopping Cart & Mobile Payments</Link>
              </header>

              <Switch>
                <Route path="/">
                  <App />
                </Route>
              </Switch>
            </Router>
          </CartProvider>
        </Elements>
      </Layout>
    );
  }
}
