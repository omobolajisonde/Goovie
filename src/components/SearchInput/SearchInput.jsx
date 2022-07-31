import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import "./SearchInput.scss";

const SearchInput = () => {
  const navigate = useNavigate();
  const submitHandler = function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("query")?.trim();
    if (!query) return;
    navigate(`/movies?query=${query}&genre=all&page=1`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <input
        name="query"
        type="search"
        className="search__input"
        placeholder="Search movies"
      />
      <button type="submit" className="search__btn">
        <BiSearchAlt />
      </button>
    </form>
  );
};

export default SearchInput;
