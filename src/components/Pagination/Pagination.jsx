import React from "react";
import { NavLink,useNavigate } from "react-router-dom";

import "./Pagination.scss";

const Pagination = ({ pageDetails, category, genre, queryParams }) => {
  const navigate = useNavigate();
  category = category === "popular" ? "trending" : category;
  const clickHandler = function (event) {
    const page = event.target.textContent.toLowerCase();
    navigate(
      `/movies?query=${queryParams.query}&genre=${queryParams.genre}&page=${page}`
    );
  };
  const pages = [];
  if (queryParams) {
    for (let i = pageDetails.minPagLimit; i <= pageDetails.maxPagLimit; i++) {
      pages.push(
        <li key={`${i}-page`} className="page">
          <button
            className={`${+queryParams.page === i && "active"}`}
            onClick={clickHandler}
          >
            <span>{i}</span>
          </button>
        </li>
      );
    }
  } else {
    for (let i = pageDetails.minPagLimit; i <= pageDetails.maxPagLimit; i++) {
      pages.push(
        <li key={`${i}-page`} className="page">
          <NavLink
            to={`/movies/${category}/${genre}/${i}`}
            className={({ isActive }) =>
              isActive ? "page__link page__link--active" : "page__link"
            }
          >
            <span>{i}</span>
          </NavLink>
        </li>
      );
    }
  }

  console.log("Pagination");
  return <ul className="pagination">{pages}</ul>;
};

export default Pagination;
