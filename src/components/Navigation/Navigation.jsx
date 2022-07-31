import React from "react";
import { NavLink, Link } from "react-router-dom";

import "./Navigation.scss";
import { SearchInput } from "../";
import logo from "../../assets/logo.png";

const Navigation = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="goovie logo" className="logo__img" />
        </div>
      </Link>
      <ul className="nav__items">
        <li className="nav__item">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "nav__link--active" : "nav__link"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? "nav__link--active" : "nav__link"
            }
          >
            Movies
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/tv"
            className={({ isActive }) =>
              isActive ? "nav__link--active" : "nav__link"
            }
          > 
            Tv
          </NavLink>
        </li>
      </ul>
      <SearchInput />
    </nav>
  );
};

export default Navigation;
