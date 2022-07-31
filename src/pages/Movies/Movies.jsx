import React, { useState, useEffect } from "react";
import {
  Outlet,
  NavLink,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Movies.scss";
import { AppContainer } from "../../containers";
import { getGenre } from "../../store/movie-slice";
import { Movie } from "../../components";

const Movies = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [searchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({});
  useEffect(() => {
    setQueryParams({
      query: searchParams.get("query"),
      genre: searchParams.get("genre"),
      page: searchParams.get("page"),
    });
  }, [searchParams]);
  useEffect(() => {
    dispatch(getGenre()); // calling the getGenre action creator
  }, [dispatch]);
  const clickHandler = function (event) {
    const genre = event.target.textContent.toLowerCase();
    navigate(
      `/movies?query=${searchParams.get("query")}&genre=${genre}&page=1`
    );
  };
  if (queryParams.query && queryParams.genre && queryParams.page) return  (
    <section className="movies__section">
      <ul className="genres">
        <li className="genre">
          <button
            className={`genre__btn ${
              "all" === searchParams.get("genre") && "active"
            }`}
            onClick={clickHandler}
          >
            All
          </button>
        </li>
        {genres.map((genre) => (
          <li className="genre" key={genre.id}>
            <button
              className={`${
                genre.name.toLowerCase() === searchParams.get("genre") &&
                "active"
              }`}
              onClick={clickHandler}
            >
              {genre.name}
            </button>
          </li>
        ))}
      </ul>
      <h1>See results for "{queryParams.query}"</h1>
      <Movie queryParams={queryParams}/>
      </section>
  );
  return (
    <section className="movies__section">
      <ul className="genres">
        <li className="genre">
          <NavLink
            to={`/movies/${category || "trending"}/all`}
            className={({ isActive }) =>
              isActive ? "genre__link genre__link--active" : "genre__link"
            }
          >
            All
          </NavLink>
        </li>
        {genres.map((genre) => (
          <li className="genre" key={genre.id}>
            <NavLink
              to={`/movies/${
                category || "trending"
              }/${genre.name.toLowerCase()}`}
              className={({ isActive }) =>
                isActive ? "genre__link genre__link--active" : "genre__link"
              }
            >
              {genre.name}
            </NavLink>
          </li>
        ))}
      </ul>
      {category ? (
        <h1>{category.replace("_", " ")}</h1>
      ) : (
        <div className="desc">
          <p className="desc__text">
            Browse and discover unlimited movies from the different categories
            on the left side bar and filter based on the genre of interest. You
            can also search for a specific movie in the search bar on the top
            right corner of the screen.
          </p>
        </div>
      )}
      <Outlet />
    </section>
  );
};

export default AppContainer(Movies);
