import React from "react";

import { MainContainer, Navigation, SideBar } from "../../components";

const AppContainer = (Component) =>
  function HOC() {
    return (
      <>
        <Navigation />
        <SideBar />
        <MainContainer>
          <Component />
        </MainContainer>
      </>
    );
  };

export default AppContainer;
