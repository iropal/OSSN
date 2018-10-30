// External modules.
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from "gatsby"


// Local modules.
import BasicLayout from '../components/layouts/layout-base/layout-base';
import LayoutContained from './../components/layouts/layout-contained/layout-contained';
import MemberTeaser from './../components/components/member-teaser/member-teaser';
import Layout2Col from './../components/layouts/layout-2col/layout-2col';
import Layout2ColsUnequal from './../components/layouts/layout-2col-unequal/layout-2col-unequal';
import BoxShadow from './../components/components/shadow-box/shadow-box';
import {SearchFilter, SelectFilter} from './../components/components/filters/filters';

// Import page title from gatsby config. TODO Remove and fid title another way.
import GatsbyConfig from './../../gatsby-config';

class Members extends React.PureComponent {

  constructor(props) {
    super(props);

    const options = [
      {value: 'defualt', label: 'default'},
      {value: 'name', label: 'name'},
      {value: 'club', label:'club'}
    ];

    this.state = {
      view: 'grid',
      searchString: '',
      sortOptions: options,
      currentSortOption: options[0],
    }
  }
  //
  // changeSearch = (event) => {
  //   this.setState({searchString: event.target.value});
  // };

  changeSorting = (selected) => {
    this.setState({currentSortOption: selected});
  };

  render() {
    const snapshot = {...this.state};
    let members = this.props.data.allMembersJson.edges.slice();
    let totalCount = this.props.data.allMembersJson.totalCount;

    const memberList = members.map((member, i)=>{
      return  (
        <div key={i} >
          <MemberTeaser member={member.node}  id={i} />
        </div>)
    });

    return (
      <BasicLayout>
        <Helmet>
          <title>{['Members', '|', GatsbyConfig.siteMetadata.title].join(" ")}</title>
        </Helmet>

        <LayoutContained>
          <Layout2ColsUnequal secondNarrow>
            <div>
              <h1> Members </h1>
              <p>
                Lorem ipsum dolor sit amet, nonumy lucilius et pro. Mel ut diam choro, propriae lucilius efficiendi an nam, suas facer qualisque no nec. An fugit soluta per. Ad mei debitis electram, officiis intellegat usu ei, ius eu zril intellegam consequuntur. Sumo delectus te nam, eam placerat salutandi no, nibh aperiam no ius. Id volumus sententiae interesset quo, natum scriptorem accommodare nam id, semper blandit ius ea.
              </p>
              <p>
                Lorem ipsum dolor sit amet, nonumy lucilius et pro. Mel ut diam choro, propriae lucilius efficiendi an nam, suas facer qualisque no nec. An fugit soluta per. Ad mei debitis electram, officiis intellegat usu ei, ius eu zril intellegam consequuntur. Sumo delectus te nam, eam placerat salutandi no, nibh aperiam no ius. Id volumus sententiae interesset quo, natum scriptorem accommodare nam id, semper blandit ius ea.
              </p>


              <div>
                <BoxShadow >
                  <h2 className="title title--x-small title--centered">Showing {memberList.length} out of {totalCount} members</h2>
                  <SelectFilter options={snapshot.sortOptions} value={snapshot.currentSortOption}
                                onChange={this.changeSorting}/>
                  <SearchFilter />
                </BoxShadow>

                <Layout2Col horizontalGutters verticalGutters>
                  {memberList}
                </Layout2Col>
              </div>
            </div>
            <div>
              <img src="#" alt="guys with a laptop pretending to be busy" />
              <br />
              <img src="#" alt="join the network" />
            </div>
          </Layout2ColsUnequal>
        </LayoutContained>
      </BasicLayout>
    );
  }
}

// const GET_MEMBERS = gql`
//   {
//     user {
//       id
//       userName
//       email
//       firstName
//       lastName
//       imageUrl
//       receiveNewsletter
//       description
//       sortDescription
//       githubUrl
//       personalUrl
//     }
//   }
// `;

export default Members;

export const query = graphql`
  query IndexQuery {
    allMembersJson(limit:2) {
    totalCount
      edges {
        node {
          name
          isLeader
          image
          username
        }
      }
    }
  }
`;


// REVIEW:
// code for graphQL query
// import { Query } from 'react-apollo';
//import gql from 'graphql-tag';
/*
 <Query query={GET_MEMBERS}>
 {({ loading, error, data })=>{
 if (loading) return 'Loading....';
 if (error) return <div> `Error ${error.message}` </div> ;
 data.user = {
 ...data.user,
 username: data.user.userName
 };

 return (
 <div>
 <MemberTeaser member={data.user} />
 </div>
 );
 }}
 </Query>
 */
