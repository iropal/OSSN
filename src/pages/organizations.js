// TODO: remove the linter disablement after updating the images
/* eslint-disable */

// external modules
import React, {memo} from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from "gatsby"
import Img from 'gatsby-image';

// Local modules.
import BasicLayout from '../components/layouts/layout-base/layout-base';
import LayoutContained from './../components/layouts/layout-contained/layout-contained';
import Organization from './../components/components/organization/organization';
import Layout3Col from './../components/layouts/layout-3col/layout-3col';
import Layout2Col from './../components/layouts/layout-2col/layout-2col';
import Layout2ColsUnequal from './../components/layouts/layout-2col-unequal/layout-2col-unequal';

// Import page title from gatsby config.
//TODO: Remove and fid title another way.
import GatsbyConfig from './../../gatsby-config';

// import bannerImage from './../images/affiliationsBanner.png';

const Organizations = (props) => {

  const content = props.data.allOrganizationsJson.edges.map((node, i)=>{
    return <Organization organization={node.org}  key={i}/>
  });

  return (
    <BasicLayout>
      <Helmet>
        <title>{['Organization', '|', GatsbyConfig.siteMetadata.title].join(" ")}</title>
      </Helmet>
      <LayoutContained>
        <div>
          <Img fluid={props.data.organizationsBanner.childImageSharp.fluid} />
        </div>


        <Layout2ColsUnequal secondNarrow>
          <div>
            <div>
              <h1> Affiliations </h1>
              <p>
                Lorem ipsum dolor sit amet, nonumy lucilius et pro. Mel ut diam choro, propriae lucilius efficiendi an nam, suas facer qualisque no nec. An fugit soluta per. Ad mei debitis electram, officiis intellegat usu ei, ius eu zril intellegam consequuntur. Sumo delectus te nam, eam placerat salutandi no, nibh aperiam no ius. Id volumus sententiae interesset quo, natum scriptorem accommodare nam id, semper blandit ius ea.
              </p>
            </div>

            <div>
              <Layout2Col verticalGutters horizontalGutters>
                <div>
                  <h3>Who helps us?</h3>
                  <p>
                    Lorem ipsum dolor sit amet, nonumy lucilius et pro. Mel ut diam choro, propriae lucilius efficiendi an nam, suas facer qualisque no nec. An fugit soluta per. Ad mei debitis electram, officiis intellegat usu ei, ius eu zril intellegam consequuntur. Sumo delectus te nam, eam placerat salutandi no, nibh aperiam no ius. Id volumus sententiae interesset quo, natum scriptorem accommodare nam id, semper blandit ius ea.
                  </p>
                </div>
                <div>
                  <h3>Opportunities</h3>
                  <p>
                    Lorem ipsum dolor sit amet, nonumy lucilius et pro. Mel ut diam choro, propriae lucilius efficiendi an nam, suas facer qualisque no nec. An fugit soluta per. Ad mei debitis electram, officiis intellegat usu ei, ius eu zril intellegam consequuntur. Sumo delectus te nam, eam placerat salutandi no, nibh aperiam no ius. Id volumus sententiae interesset quo, natum scriptorem accommodare nam id, semper blandit ius ea.
                  </p>
                </div>
              </Layout2Col>
            </div>
          </div>
          <div>
            <img src="#" alt="balloon image" />
          </div>
        </Layout2ColsUnequal>

        <Layout3Col horizontalGutters verticalGutters >
          {content}
        </Layout3Col>
      </LayoutContained>
    </BasicLayout>
  );
};

export default memo(Organizations);


export const query = graphql`
  {
    allOrganizationsJson {
      edges {
        org: node {
        ...organization
  	    }
      }
    }

    organizationsBanner: file(relativePath: {eq: "organizationsBanner.png"}) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          base64
          tracedSVG
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
          originalImg
          originalName
        }
      }
    }
  }
`;
