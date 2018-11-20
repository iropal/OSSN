/*
This is the template for a single club view.
*/
import React from 'react';

// Local modules.
import LayoutContained from './../../layouts/layout-contained/layout-contained';
import Layout2ColsUnequal from './../../layouts/layout-2col-unequal/layout-2col-unequal';
import MemberList from './../member-list/member-list';
import ClubInfo from './../club-info/club-info';
import Shape from './../shape/shape';
import { PlusCircle } from 'react-feather';
import Banner from './../banner/banner';

import './club-full.scss';

export default class Club extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldCTAAppear() {
    return true;
  }

  render() {
    const club = { ...this.props.club };
    const clubMembers = [...this.props.club.users];

    const ctaPlaceholder = this.shouldCTAAppear() ? (
      <a href="/test" className="button club-full__cta">
        <span className="club-full__cta-icon">
          <PlusCircle />
        </span>
        Become a member of this club
      </a>
    ) : (
      ''
    );

    return (
      <LayoutContained className="club-full">
        <div className="club-full__header">
          <div className="club-full__cover-wrapper">
            <Banner
              imageMobile={this.props.mobileImage.childImageSharp.resolutions}
              image={this.props.image.childImageSharp.fluid}
            />
          </div>

          <div className="club-full__profile-picture-section">
            <div className="club-full__profile-picture-wrapper">
              <img
                src="https://d.ibtimes.co.uk/en/full/1477880/lemmy.jpg"
                alt="Club profile"
                className="club-full__profile-picture"
              />
            </div>
          </div>

          <div className="club-full__title-wrapper">
            <h1 className="club-full__title"> {club.title} </h1>
            <span className="club-full__subtitle"> {club.subtitle} </span>
          </div>
        </div>

        <Layout2ColsUnequal
          inverse
          horizontalGutters
          verticalGutters
          className="club-full__body"
        >
          <div className="club-full__info-container">
            {ctaPlaceholder}
            <ClubInfo club={club} />
          </div>
          <div className="club-full__description">
            <div>
              <h2> Description </h2>
              <p>
                The RIT Linux Users Group (RITlug) is a community of students
                and faculty at the Rochester Institute of Technology dedicated
                to teaching and sharing the Linux operating system and open
                source software with others. RITlug also works on various other
                projects, such as a Linux distribution customized for students
                and faculty at RIT.
              </p>
              <p>
                Meetings are open to anyone interested, new members and old.
                RITlug meets on every Friday, from 4:00PM until 6:00PM in
                GOL/70-2650 (Large DB Lab). If you can’t make the whole time,
                that’s fine! Meetings typically have a presentation first, then
                we open the floor to discussion and technical help. Interested?
                Just show up!
              </p>
              <p>Looking for more information? Email us!</p>
              <h2> Code of conduct </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                vitae risus non orci feugiat vulputate quis non est. Mauris
                posuere, nulla id congue bibendum, nibh risus accumsan metus, at
                iaculis eros sem quis odio.
              </p>
              <p>
                Pellentesque gravida rhoncus erat, eu porta arcu ultrices eu.
                Vivamus quis fringilla ex. Pellentesque et mauris purus.
                Vestibulum at turpis non est condimentum vehicula. Nulla non
                vulputate sapien, aliquet commodo elit.
              </p>
              <p>
                Curabitur tempus ligula id nulla facilisis, quis gravida ante
                dictum. Ut tincidunt sed massa vel elementum. Donec commodo
                tellus maximus viverra dignissim. Vestibulum sollicitudin a erat
                vel imperdiet. Fusce at mi in nunc fermentum rutrum. Morbi
                tempor aliquam posuere. Mauris in commodo lectus, eget mollis
                neque. Maecenas sollicitudin nulla quis sapien ultricies, quis
                sagittis ante mattis. In tincidunt metus et nunc sollicitudin
                dignissim.
              </p>
            </div>
            <div className="club-full__members-section">
              <h2> Members </h2>
              <Shape
                waves
                darkSkyBlue
                className="club-full__members-shape club-full__members-shape--waves"
              />
              <MemberList members={clubMembers} />
            </div>
          </div>
        </Layout2ColsUnequal>
      </LayoutContained>
    );
  }
}
