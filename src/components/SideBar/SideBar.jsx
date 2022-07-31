import React from "react";
import { NavLink } from "react-router-dom";
import { MdMovieFilter } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { FaRegChartBar, FaVideo, FaStar,FaRegUser } from "react-icons/fa";

import "./SideBar.scss";

const SideBar = () => {
  return (
    <nav className="side__nav">
      <ul className="side__items">
        <li className="side__item">
          <NavLink
            to="/movies/trending"
            className={({ isActive }) =>
              isActive ? "side__link side__link--active" : "side__link"
            }
          >
            <MdMovieFilter />
          </NavLink>
        </li>
        <li className="side__item">
          <NavLink
            to="/movies/now_playing"
            className={({ isActive }) =>
              isActive ? "side__link side__link--active" : "side__link"
            }
          >
            <BiMoviePlay />
          </NavLink>
        </li>
        <li className="side__item">
          <NavLink
            to="/movies/top_rated"
            className={({ isActive }) =>
              isActive ? "side__link side__link--active" : "side__link"
            }
          >
            <FaRegChartBar />
          </NavLink>
        </li>
        <li className="side__item">
          <NavLink
            to="/movies/upcoming"
            className={({ isActive }) =>
              isActive ? "side__link side__link--active" : "side__link"
            }
          ><FaVideo /></NavLink>
        </li>

        <li className="side__item">
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive ? "side__link side__link--active" : "side__link"
            }
          ><FaStar /></NavLink>
        </li>
        <li className="side__item">
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "side__link side__link--active" : "side__link"
            }
          ><FaRegUser /></NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
