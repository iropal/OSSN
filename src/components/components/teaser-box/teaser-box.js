import React from 'react';

// local modules
import ShadowBox from './../shadow-box/shadow-box';

// utils
import {verboseDate} from './../../../utils/dates';

// styles
import './teaser-box.scss';

export const TeaserBox = (props) => {
  const resource = props.resource;
  // TODO: remove the Lorem ipsum
  const title = resource.shortDescription || 'Project GNOME maps was just added into the list of the available projects for contributions.';
  const date = verboseDate(resource.updatedAt) ;
  const target = resource.url;
  const image = resource.image || 'https://www.publicdomainpictures.net/pictures/230000/nahled/eins-bis-null-1498972707SZr.jpg';

  const classes = [props.className, 'teaser-box'];
  return (
    <div className={classes.join(' ')} >
      <a href={target} className="teaser-box__wrapper-link">

        <ShadowBox smallPaddings>
          <div className="teaser-box__inner">
            <div className="teaser-box__image-wrapper">
              <img src={image} alt="external resource" className="teaser-box__image"/>
            </div>
            <div className="teaser-box__text">
              <div className="teaser-box__title"> {title} </div>
              <span className="teaser-box__date"> {date} </span>
            </div>
          </div>
        </ShadowBox>
      </a>
    </div>
  );
};

export const DummyTeaserBox = (props) => {
  console.log('this is a line ');
  return (
    <div className="teaser-box teaser-box--dummy">
      <div className="teaser-box__wrapper-link">
        <ShadowBox smallPaddings>
          <div className="teaser-box__inner">
            <div className="teaser-box__dummy-row"></div>
            <div className="teaser-box__dummy-row teaser-box__dummy-row--small"></div>
          </div>
        </ShadowBox>
      </div>
    </div>
  );
}

export const TeaserBoxList = (props) => {

  let resources;
  if (props.dummyData) {
    const number = props.number || 4;
    resources = [];
    for(let i=0; i<number; i++)
      resources.push(<DummyTeaserBox key={i} />);
  } else {
    resources = props.items.map((resource, i) => {
      return <TeaserBox key={i} resource={resource} />
    });
  }

  const classes = ['teaser-box__list-wrapper'];
  if (props.dummyData) classes.push('teaser-box__list-wrapper--dummy')
  classes.push(props.className || '');

  return (
    <div className={classes.join(" ")}>
      {resources}
    </div>
  )
}

// export ExternalResource;
// export ExternalResourceList;