import React from "react";

import "./MainContainer.scss";

const MainContainer = ({children}) => {
  return (
    <main className="main">
      {children}
    </main>
  )
};

export default MainContainer;
