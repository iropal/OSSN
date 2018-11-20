// External modules.
import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import BasicLayout from '../components/layouts/layout-base/layout-base';
import GatsbyConfig from './../../gatsby-config';
import { ClubTeaserList } from './../components/components/club-teaser-list/club-teaser-list';
import {
  SearchFilter,
  ToggleFilter
} from '../components/components/filter/filter';
import Map from './../components/components/map/map';
import LayoutContained from './../components/layouts/layout-contained/layout-contained';
import { Search } from 'react-feather';
import ShadowBox from './../components/components/shadow-box/shadow-box';

import './../components/pages-styles/find-club.scss';

// TODO: Remove and fid title another way.
class Clubs extends React.PureComponent {
  /*
    Handle the value of th search and the toggle button from state.
  */
  constructor() {
    super();
    this.state = {
      view: 'list',
      searchString: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  // State management functions. Used by children components.
  handleToggleMap = () => {
    const snapshot = { ...this.state };
    this.setState({ view: snapshot.view === 'map' ? 'list' : 'map' });
  };

  handleSearch = event => {
    this.setState({ searchString: event.target.value });
  };

  render() {
    // console.log(this.props.data);

    const snapshot = { ...this.state };

    // Keep the props object unmodified for later reference (sorting undo sorting etc)
    let clubs = this.props.data.ossnApi.clubs.clubs.slice();

    // Filter clubs by the search string.
    if (
      snapshot.searchString !== '' ||
      typeof snapshot.searchString !== 'undefined'
    ) {
      clubs = clubs.filter((club, i) => {
        return (
          club.title
            .toLowerCase()
            .indexOf(snapshot.searchString.trim().toLowerCase()) >= 0
        );
      });
    }

    // Decide which view to show.
    const content =
      snapshot.view === 'map' ? (
        <Map clubs={clubs} />
      ) : (
        <ClubTeaserList clubs={clubs} />
      );

    return (
      <BasicLayout>
        <Helmet>
          <title>
            {['Clubs', '|', GatsbyConfig.siteMetadata.title].join(' ')}
          </title>
        </Helmet>
        <LayoutContained>
          <div className="find-club__header">
            <h1> Clubs </h1>
            <div className="find-club__filters-wrapper">
              <ShadowBox className="find-club__filters-wrapper-inner">
                <div className="find-club__filter-toggle">
                  <ToggleFilter
                    onClick={this.handleToggleMap}
                    active={snapshot.view === 'map'}
                    left="List view"
                    right="Map View"
                  />
                </div>
                <div className="find-club__filter-search">
                  <SearchFilter
                    placeholder="Filter"
                    onChange={this.handleSearch}
                    id="find-club-search"
                    hideLabel
                    icon={Search}
                  />
                </div>
              </ShadowBox>
            </div>
          </div>
          {content}
        </LayoutContained>
      </BasicLayout>
    );
  }
}

export default Clubs;

export const query = graphql`
  {
    ossnApi {
      clubs {
        clubs {
          id
          title: name
          subtitle: sortDescription
          imageUrl
          clubUrl
          location {
            address
            id
            lat
            lng
          }
          users {
            id
            userName
            firstName
            lastName
            imageUrl
            receiveNewsletter
            description
            githubUrl
            personalUrl
            email
          }
        }
      }
    }
  }
`;
