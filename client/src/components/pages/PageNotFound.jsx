import React from "react";
import { Truck } from "../../assets/styles/svg";
import Headline from "../common/Headline";

const PageNotFound = () => {
  return (
    <div className="mt-5">
      <Headline>
        <Truck />
      </Headline>
      <Headline>PAGE NOT FOUND 404</Headline>
    </div>
  );
};

export default PageNotFound;
