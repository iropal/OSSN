// styles
import '../components/layouts/layout-custom-grid/layout-custom-grid.scss';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React, { memo } from 'react';

import BasicLayout from '../components/layouts/layout-base/layout-base';
import BlockquoteBox from './../components/components/blockquote-box/blockquote-box';
import BecomeMember from './../components/components/home-become-member/home-become-member';
import ImageBox from './../components/components/image-box/image-box';
import OrganizationList from './../components/components/organizations-list/organizations-list';
import LayoutContained from './../components/layouts/layout-contained/layout-contained';

const IndexPage = props => {
  return (
    <BasicLayout>
      {/* New section */}
      <LayoutContained>
        <div>
          <Img fluid={props.data.imageOne.childImageSharp.fluid} />
          {/* <TopBanner src={bannerImage} alt="Open source clubs" page="home" /> */}
        </div>
        <h1> What's happening </h1>
        <div>
          <div>
            <div>
              <div className="layout-custom-grid">
                <div className="layout-custom-grid__item layout-custom-grid__item--1">
                  <ImageBox
                    tall
                    titleLargeTop="Read"
                    titleSmall="our updated"
                    titleLargeBottom="blog!"
                    image="./../components/components/image-box/image-box/images/panel-typewriter.jpg"
                  />
                </div>
                <div className="layout-custom-grid__item layout-custom-grid__item--2">
                  <ImageBox
                    titleSmall="See the all-new"
                    titleLargeBottom="Opportunities!"
                  />
                </div>
                <div className="layout-custom-grid__item layout-custom-grid__item--3">
                  <ImageBox
                    tall
                    titleLargeTop="Listen"
                    titleSmall="to our"
                    titleLargeBottom="podcast!"
                  />
                </div>
                <div className="layout-custom-grid__item layout-custom-grid__item--4">
                  <ImageBox
                    titleLargeTop="Fixme"
                    titleSmall="New kid on the block!"
                  />
                </div>
                <div className="layout-custom-grid__item layout-custom-grid__item--5">
                  <ImageBox
                    titleLargeTop="MozFest is over :-("
                    titleSmall="But you can re-live it with our photos!"
                  />
                </div>
                <div className="layout-custom-grid__item layout-custom-grid__item--6">
                  <BlockquoteBox
                    blockquote="In open source, we feel strongly that to really do something well, you have to get a lot of people involved."
                    author="Linus Torvalds"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutContained>

      {/* why join the OSSN? */}
      <LayoutContained>
        <BecomeMember />
      </LayoutContained>

      {/* Organizations */}
      <LayoutContained>
        <OrganizationList
          organizations={props.data.allOrganizationsJson.edges}
        />
      </LayoutContained>
    </BasicLayout>
  )
}

export default memo(IndexPage)

export const query = graphql`
  {
    allOrganizationsJson {
      edges {
        org: node {
          ...organization
        }
      }
    }

    imageOne: file(relativePath: { eq: "home.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          base64
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
`
