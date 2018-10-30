// TODO: remove the linter disablement after updating the links
// styles
import './../components/pages-styles/faq-page.scss';

import { graphql } from 'gatsby';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

import BasicLayout from '../components/layouts/layout-base/layout-base';
import GatsbyConfig from './../../gatsby-config';
import FaqGroup from './../components/components/faq-group/faq-group';
import Layout2Cols from './../components/layouts/layout-2col/layout-2col';
import LayoutContained from './../components/layouts/layout-contained/layout-contained';

// TODO: Remove and fid title another way.
/* eslint-disable */
const Questions = props => {
  // REVIEW:
  const resultGroups = props.data.allDataJson.edges[0]
    ? props.data.allDataJson.edges[0].node
    : {}
  const group0 = resultGroups.group0 ? resultGroups.group0 : []
  const group1 = resultGroups.group1 ? resultGroups.group1 : []
  const group2 = resultGroups.group2 ? resultGroups.group2 : []
  const group3 = resultGroups.group3 ? resultGroups.group3 : []

  return (
    <BasicLayout>
      <Helmet>
        <title>{['FAQ', '|', GatsbyConfig.siteMetadata.title].join(' ')}</title>
      </Helmet>

      <LayoutContained>
        <div className="faq__header">
          <h1 className="faq__title"> FAQ </h1>
          <p className="faq__subtitle">
            The most Frequently Asked Questions on OSSN. <br />
            And their answers!
          </p>
        </div>

        <Layout2Cols horizontalGutters>
          <div>
            <FaqGroup group={group0} />
            <FaqGroup group={group1} />
          </div>
          <div>
            <FaqGroup group={group2} />
            <FaqGroup group={group3} />
          </div>
        </Layout2Cols>

        <div className="faq__footer">
          <h2 className="faq__footer-title"> Have more questions? </h2>
          <p className="faq__footer-text">
            Cool! Reach out to us to
            <span>
              {' '}
              <a href="#"> Facebok </a>{' '}
            </span>{' '}
            or
            <span>
              {' '}
              <a href="#"> Twitter </a>{' '}
            </span>
          </p>
        </div>
      </LayoutContained>
    </BasicLayout>
  )
}

export default memo(Questions)

export const query = graphql`
  query {
    allDataJson {
      edges {
        node {
          id
          group0 {
            header
            body
          }
          group1 {
            header
            body
          }
          group2 {
            header
            body
          }
          group3 {
            header
            body
          }
        }
      }
    }
  }
`
