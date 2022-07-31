import React from "react";
import {Link} from "react-router-dom";

import "./Home.scss";
import { AppContainer } from "../../containers";

const Home = () => {
  return (
    <section className="home">
      <div className="home__heading">
        <h1 className="heading__main mb-md">
          Discover unlimited movies and TV shows.
        </h1>
        <h2 className="heading__2">
          Get in groove with GOOVIE!
        </h2>
      </div>
      <div className="home__cta">
        <Link to="/signup" className="btn btn-link">Sign Up Now!</Link>
      </div>
    </section>
  );
};

export default AppContainer(Home);
