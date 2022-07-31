import React, { useState, useEffect } from "react";
import { FaHeart, FaCopy } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

import "./Movie.scss";
import Pagination from "../Pagination/Pagination";
const PAGE_RANGE = 10;

const Movie = ({ queryParams }) => {
  let { category, genre, page } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const genres = useSelector((state) => state.genres);
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [pageLimit, setPageLimit] = useState(0);
  const [pageDetails, setPageDetails] = useState({
    minPagLimit: 0,
    maxPagLimit: 0,
  });

  category = category === "trending" ? "popular" : category;

  useEffect(() => {
    const getMovies = async function () {
      try {
        let response;
        if (queryParams) {
          response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${queryParams.query}&page=${queryParams.page}&include_adult=false`
          );
        } else {
          response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}movie/${category}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
          );
        }
        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        console.log(data);
        setMovies(data.results);
        setPageLimit(data.total_pages < 100 ? data.total_pages : 100);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [page, category,queryParams]);

  useEffect(() => {
    const getMinMaxTensLimit = (page) => {
      const num = +page;
      if (!num || num > pageLimit) return;
      for (let i = 1; i <= 10; i++) {
        const maxLimit = 10 * i;
        if (num > maxLimit) continue;
        const minPagLimit = num - (9 - (maxLimit - num));
        const maxPagLimit = maxLimit >= pageLimit ? pageLimit : maxLimit;
        setPageDetails({ minPagLimit, maxPagLimit });
        break;
      }
    };
    if  (queryParams) getMinMaxTensLimit(queryParams.page)
    else getMinMaxTensLimit(page);
    
  }, [page, pageLimit, setPageDetails,queryParams]);

  const paginationHandler = function (action) {
    if (action === "prev") {
      const prev = pageDetails.minPagLimit - 1;
      if (queryParams) {
        searchParams.set("page",prev);
        navigate(
          `/movies?query=${queryParams.query}&genre=${queryParams.genre}&page=${searchParams.get("page")}`
        );
      } else navigate(location.pathname.replace(page, prev));
    }
    if (action === "next") {
      const next = pageDetails.maxPagLimit + 1;
      if (queryParams) {
        searchParams.set("page",next);
        navigate(
          `/movies?query=${queryParams.query}&genre=${queryParams.genre}&page=${searchParams.get("page")}`
        );
      } else navigate(location.pathname.replace(page, next));
    }
  };

  let genreDetails;
  if (queryParams){
    genreDetails = genres.find((gen) => gen.name.toLowerCase() === queryParams.genre);
  }
  const filteredMovies =
    (genre === "all" || queryParams?.genre === "all")
      ? movies
      : movies.filter((movies) => movies?.genre_ids.includes(genreDetails?.id));
  console.log(filteredMovies);
  return (
    <div className="movies">
      {filteredMovies.map((movie, i) => (
        <div key={movie.id} className={`movie`}>
          <span className="movie__rating">{movie.vote_average.toFixed(1)}</span>
          <img
            src={`${process.env.REACT_APP_API_BASE_IMG_URL}w500/${movie.poster_path}`}
            alt={movie.title}
            className="movie__poster"
          />
          <h4 className="movie__title">{movie.title}</h4>
          <div className="action">
            <button className="action__fav">
              <FaHeart />
            </button>
            <button className="action__copy">
              <FaCopy />
            </button>
          </div>
        </div>
      ))}
      <div className="movie__cta">
        {pageDetails.minPagLimit > PAGE_RANGE && (
          <button
            className="btn-alt"
            onClick={paginationHandler.bind("_", "prev")}
          >
            <BsArrowLeft /> Prev
          </button>
        )}
        <Pagination
          pageDetails={pageDetails}
          category={category}
          genre={genre}
          queryParams = {queryParams}
        />
        {pageDetails.maxPagLimit < pageLimit && (
          <button
            className="btn-alt"
            onClick={paginationHandler.bind("_", "next")}
          >
            Next <BsArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Movie;
