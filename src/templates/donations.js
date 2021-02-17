import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Checkout from "../components/Checkout";

// import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { CartProvider } from "use-shopping-cart";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

import components, { Layout } from "../components/index";

import { htmlToReact } from "../utils";

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
        <article className="page py-5 py-sm-6">
          <div className="container container--medium">
            <header className="page__header">
              <h1 className="page__title">
                {_.get(this.props, "pageContext.frontmatter.title", null)}
              </h1>
            </header>
            <div className="page__body text-block">
              {htmlToReact(_.get(this.props, "pageContext.html", null))}
            </div>
            <Checkout />
          </div>
        </article>
      </Layout>
    );
  }
}
