import React, { useState } from "react";
import "./Stamp.css";
import stamp from "../../assets/post-stamp.png";

const Stamp = ({ url, name, date }) => {
  return (
    <section className="passport-stamp">
      <img src={stamp} alt="stamp border" className="stamp-border" />
      <img src={url} alt="park scenery" className="park-stamp-image" />
      <h4 className="stamp-title">{name}</h4>
      <h4 className="stamp-date">{date}</h4>
    </section>
  );
};

export default Stamp;
