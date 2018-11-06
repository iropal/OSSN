/*
  
*/
import React from 'react';
import { Link } from 'react-feather';

// local modules
import ShadowBox from './../shadow-box/shadow-box';

// styles
import './external-link-box.scss';

export const ExternalLinkBox = props => {
  const resource = props.resource;
  const title = resource.title;
  const target = resource.link;
  const description = resource.description;
  const image = resource.attachment.publicURL;

  const classes = [props.className, 'external-link-box'];
  return (
    <div className={classes.join(' ')}>
      <a href={target} className="external-link-box__wrapper-link">
        <ShadowBox zeroPadding className="external-link-box__link-inner">
          <div className="external-link-box__image-wrapper">
            <img src={image} alt={title} className="external-link-box__image" />
          </div>
          <div className="external-link-box__text">
            <div className="external-link-box__title"> {title} </div>
            <div className="external-link-box__url">
              <Link size={12} /> {description}
            </div>
          </div>
        </ShadowBox>
      </a>
    </div>
  );
};

export default ExternalLinkBox;
