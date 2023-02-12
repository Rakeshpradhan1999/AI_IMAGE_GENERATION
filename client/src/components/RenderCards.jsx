import React from "react";
import Card from "./Card";

const RenderCards = ({ data, title }) => {
  if (data.length > 0) {
    return data.map((val, i) => (
      <React.Fragment key={i}>
        <Card data={val} />
      </React.Fragment>
    ));
  }

  return <h3 className="">{title}</h3>;
};

export default RenderCards;
