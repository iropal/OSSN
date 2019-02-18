import './main-navigation.scss';

import { Link } from 'gatsby';
import React from 'react';

import UserMenu from './../../components/user-menu/user-menu';

const Navigation = () => (
  <nav aria-labelledby="primary-navigation" className="main-navigation">
    <h2 className="visually-hidden" id="primary-navigation">
      Primary Navigation
    </h2>
    <ul className="main-navigation__item-wrapper">
      <li className="main-navigation__item">
        <Link
          to="/clubs"
          className="main-navigation__link"
          activeClassName="is-active"
        >
          Clubs
        </Link>
      </li>
      <li className="main-navigation__item">
        <Link
          to="/contribute"
          className="main-navigation__link"
          activeClassName="is-active"
        >
          Opportunities
        </Link>
      </li>
      <li className="main-navigation__item">
        <Link
          to="/members"
          className="main-navigation__link"
          activeClassName="is-active"
        >
          Members
        </Link>
      </li>
    </ul>
    <UserMenu />
  </nav>
);

export default Navigation;
