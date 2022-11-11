import React from "react";
import "./Stamp.css";
import stamp from "../../assets/post-stamp.png";
import PropTypes from 'prop-types';

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

Stamp.propTypes = {
    url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
 }

export default Stamp;
