import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

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

export default class Advanced extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        {_.map(
          _.get(this.props, "pageContext.frontmatter.sections", null),
          (section, section_idx) => {
            let component = _.upperFirst(
              _.camelCase(_.get(section, "type", null))
            );
            let Component = components[component];
            return (
              <Component
                key={section_idx}
                {...this.props}
                section={section}
                site={this.props.pageContext.site}
              />
            );
          }
        )}
        <script
          type="text/javascript"
          src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=d85446b94b92ed3b7b66fdff51355c7d978ef1b4"
        ></script>
      </Layout>
    );
  }
}
