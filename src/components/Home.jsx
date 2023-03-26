import React from "react";
import Recipes from "./Recipes";

const Home = (props) => {
  return (
    <div>
      <Recipes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
