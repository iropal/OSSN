import './member.scss';

import React from 'react';
import { ApolloConsumer, withApollo } from 'react-apollo';
import { Check, Feather, GitHub, Link, Users, X } from 'react-feather';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import GatsbyConfig from './../../../../gatsby-config';
import { returnKeyCheck } from './../../../utils/accessibility';
import { mapUserToProps } from './../../../utils/redux-utils';
import TextInput from './../../forms/text-input/text-input';
import LayoutContained from './../../layouts/layout-contained/layout-contained';
import ShadowBox from './../shadow-box/shadow-box';
import Shape from './../shape/shape';
import { editUserMutation, getUserQuery } from './member-queries';

const shapesUnordered = [
  <Shape
    seafoamBlue
    square
    className="member__shape member__shape--square"
    key="square"
  />,
  <Shape
    sunnyYellow
    triangle
    className="member__shape member__shape--triangle"
    key="triangle"
  />,
  <Shape
    darkSkyBlue
    circle
    className="member__shape member__shape--circle"
    key="circle"
  />
];

// Shuffles shapes to print them randomly in different areas.
// Uses Fisher-Yates (aka Knuth) Shuffle algorithm.
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffle = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle.
  while (0 !== currentIndex) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/*
 Profile page template.
 This component is used for showing and editing a member's profile.

 handling props:
 editable: if true, shows the 'edit' button. This button can trigger the edit
 state of the component.

 The state has the profile information and the edit flag.
 If the edit flag is true, every field is an input element.
 else is a label.

 The state also stores the state of the component, so modifications on edit can
 be undone.
 */
// utils
// Local modules.
// styles
class Member extends React.PureComponent {
  constructor(props) {
    super(props);

    const initData = {
      name: this.props.member.name,
      imageUrl: this.props.member.imageUrl,
      location: this.props.member.sortDescription,
      club: this.props.member.clubs,
      github: this.props.member.githubUrl,
      personal: this.props.member.personalUrl,
      description: this.props.member.description,
      receiveNewsletter: this.props.member.receiveNewsletter,
      clubsToPreserve: this.props.member.clubs.map(club => club.id),
      shapes: shuffle(shapesUnordered),
      firstLoad: true
    };

    this.state = {
      ...initData,
      edit: false,
      editable: !!this.isCurrentUser(),
      history: {
        ...initData
      }
    };
  }

  componentDidMount = () => {
    this.props.client
      .query({
        query: getUserQuery,
        variables: { id: this.props.member.id }
      })
      .then(({ data }) => {
        if ((data || {}).user) {
          this.setState({ ...data.user, club: data.user.clubs });
        }
      })
      .catch(e => {
        //TODO: Handle error
      });
  };

  componentDidUpdate(prevProps) {
    this.setState({ editable: !!this.isCurrentUser() });
  }

  isUserLoggedIn = () => {
    return !!this.props.user.user;
  };

  isCurrentUser = () => {
    return !this.isUserLoggedIn()
      ? false
      : this.props.member.id === this.props.user.user.id
      ? true
      : false;
  };

  handleName = event => {
    this.setState({ name: event.target.value });
  };

  handleLocation = event => {
    this.setState({ location: event.target.value });
  };

  handleGithub = event => {
    this.setState({ github: event.target.value });
  };

  handlePersonal = event => {
    this.setState({ personal: event.target.value });
  };

  handleDescription = event => {
    this.setState({ description: event.target.value });
  };

  handleClubSubscription = (clubId, event) => {
    if (event.target.checked) {
      // Add club id to array.
      this.setState(state => ({
        clubsToPreserve: state.clubsToPreserve.concat([clubId])
      }));
    } else {
      // Remove club id to array.
      this.setState(state => ({
        clubsToPreserve: state.clubsToPreserve.filter(club => club !== clubId)
      }));
    }
  };

  handleNewsletterSubscription = event => {
    this.setState({ receiveNewsletter: event.target.checked });
  };

  handleEdit = () => {
    this.setState(state => ({ history: { ...state }, edit: true }));
  };

  handleCancel = () => {
    this.setState(state => ({ ...state.history, edit: false }));
  };

  handleSave = () => {
    this.setState(({ clubsToPreserve, club }) => ({
      club: club.filter(club => clubsToPreserve.includes(club.id)),
      edit: false
    }));
  };

  render() {
    const snapshot = this.state;

    const name = snapshot.edit ? (
      <TextInput
        label="Name"
        onChange={this.handleName}
        value={snapshot.name}
        className="member__text-field form-input--member form-input--member-name"
        placeholder="name"
      />
    ) : (
      <div> {snapshot.name} </div>
    );

    const location = snapshot.edit ? (
      <TextInput
        label="Location"
        onChange={this.handleLocation}
        value={snapshot.location}
        className="member__text-field form-input--member form-input--member-name"
      />
    ) : (
      snapshot.location && <div> {snapshot.location} </div>
    );

    const description = snapshot.edit ? (
      <TextInput
        multiline
        label="Description"
        onChange={this.handleDescription}
        value={snapshot.description}
      />
    ) : (
      snapshot.description && <div> {snapshot.description} </div>
    );

    const club = snapshot.edit ? (
      <div>
        {snapshot.club.length > 0 && <h2>Uncheck to unsubscribe from club</h2>}

        {snapshot.club.length > 0 &&
          snapshot.club.map((club, i) => {
            // return <Organization organization={node.org} key={i} />
            return (
              <div className="member__checkbox" key={i}>
                <label htmlFor={'club-' + club.id}>
                  <input
                    name={club.name}
                    type="checkbox"
                    defaultChecked
                    id={'club-' + club.id}
                    onChange={event =>
                      this.handleClubSubscription(club.id, event)
                    }
                  />
                  {club.name}
                </label>
              </div>
            );
          })}
      </div>
    ) : (
      snapshot.club.length > 0 && (
        <div>
          <Users className="member__icon" />
          {snapshot.club
            .map(club => club.name || 'Club name missing')
            .join(', ')}
        </div>
      )
    );

    const newsletter = snapshot.edit && (
      <div className="member__newsletter">
        <Shape seafoamBlue waveLarge divider className="member__divider" />

        <div className="member__checkbox">
          <label htmlFor="newsletter">
            <input
              name="newsletter_subscription"
              type="checkbox"
              id="newsletter"
              defaultChecked={snapshot.receiveNewsletter}
              onChange={this.handleNewsletterSubscription}
            />
            I want to receive newsletter
          </label>
        </div>
      </div>
    );

    const github = snapshot.edit ? (
      <TextInput
        label="Github Url"
        onChange={this.handleGithub}
        value={snapshot.github}
        className="member__text-field form-input--member form-input--member-name"
      />
    ) : (
      snapshot.github && (
        <a href={snapshot.github}>
          <GitHub className="member__icon" />
          <span className="member__link-content">{snapshot.github}</span>
        </a>
      )
    );

    const personal = snapshot.edit ? (
      <TextInput
        label="personal web page"
        onChange={this.handlePersonal}
        value={snapshot.personal}
        className="member__text-field form-input--member form-input--member-name"
      />
    ) : (
      snapshot.personal && (
        <a href={snapshot.personal}>
          <Link className="member__icon" />
          <span className="member__link-content">{snapshot.personal}</span>
        </a>
      )
    );

    let buttonList = [];

    if (snapshot.edit) {
      buttonList.push(
        <div
          tabIndex={0}
          role="button"
          onClick={this.handleCancel}
          onKeyDown={e => {
            returnKeyCheck(e, this.handleCancel);
          }}
          className="member__button button button--reset"
          key={0}
        >
          <X size={21} />
          <span> Cancel </span>
        </div>
      );

      buttonList.push(
        <ApolloConsumer>
          {client => (
            <div
              tabIndex={0}
              role="button"
              onClick={() => {
                client.mutate({
                  variables: {
                    receiveNewsletter: snapshot.receiveNewsletter,
                    sortDescription: snapshot.location,
                    clubs: snapshot.clubsToPreserve,
                    description: snapshot.description,
                    githubUrl: snapshot.github,
                    personalUrl: snapshot.personal
                  },
                  mutation: editUserMutation
                });

                this.handleSave();
              }}
              onKeyDown={e => {
                returnKeyCheck(e, () => {
                  client.mutate({
                    variables: {
                      receiveNewsletter: snapshot.receiveNewsletter,
                      sortDescription: snapshot.location,
                      clubs: snapshot.clubsToPreserve,
                      description: snapshot.description,
                      githubUrl: snapshot.github,
                      personalUrl: snapshot.personal
                    },
                    mutation: editUserMutation
                  });

                  this.handleSave();
                });
              }}
              className="member__button button button--submit"
              key={1}
            >
              <Check size={20} />
              <span> Save changes </span>
            </div>
          )}
        </ApolloConsumer>
      );
    } else if (snapshot.editable) {
      // } else if (true) {
      buttonList.push(
        <div
          tabIndex={0}
          role="button"
          onClick={this.handleEdit}
          onKeyDown={e => {
            returnKeyCheck(e, this.handleEdit);
          }}
          className="member__button button button--reset"
          key={2}
        >
          <Feather size={18} />
          <span> Edit my profile </span>
        </div>
      );
    }

    return (
      <LayoutContained className="member">
        <Helmet>
          <title>
            {[snapshot.name, '|', GatsbyConfig.siteMetadata.title].join(' ')}
          </title>
        </Helmet>

        <div className="member__inner">
          <MediaQuery minWidth={576}>
            <div className="member__shape-wrapper-left">
              {snapshot.shapes[1]}
            </div>
            <div className="member__shape-wrapper-right">
              {snapshot.shapes[2]}
            </div>
          </MediaQuery>
          <ShadowBox className="member__card" zeroPadding>
            <div className="member__card-shape-wrapper">
              {snapshot.shapes[0]}
            </div>
            <div className="member__card-inner">
              <div className="member__image-wrapper">
                <div className="member__image-inner">
                  <img
                    src={snapshot.imageUrl}
                    alt="profile"
                    className="member__image"
                  />
                </div>
              </div>
              <div className="title title--small member__name">{name}</div>

              <div className="member__location">{location}</div>

              <div className="member__description">{description}</div>

              <Shape
                seafoamBlue
                waveLarge
                divider
                className="member__divider"
              />

              {snapshot.club.length > 0 && (
                <div>
                  <div className="member__club">{club}</div>

                  <Shape
                    seafoamBlue
                    waveLarge
                    divider
                    className="member__divider"
                  />
                </div>
              )}

              <div className="member__link member__link--github">{github}</div>

              <div className="member__link member__link--personal-page">
                {personal}
              </div>

              {newsletter}
            </div>
          </ShadowBox>

          <div className="member__button-list">{buttonList}</div>
        </div>
      </LayoutContained>
    );
  }
}

export default connect(mapUserToProps)(withApollo(Member));
