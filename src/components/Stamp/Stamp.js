import React from "react";
import "./Stamp.css";
import {Link} from 'react-router-dom'
import stamp from "../../assets/post-stamp.png";
import PropTypes from 'prop-types';

const Stamp = ({ url, name, date, parkCode }) => {
  return (
   <Link to={`/parks/${parkCode}`}> 
      <section className="passport-stamp">
        <img src={url} alt="park scenery" className="park-stamp-image" />
        <img src={stamp} alt="stamp border" className="overlay" />
        <div className="stamp-info">
          <h4 className="stamp-title">{name}</h4>
          <h4 className="stamp-date">{date}</h4>
        </div>
      </section>
    </Link>
  );
};

Stamp.propTypes = {
    url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    parkCode: PropTypes.string.isRequired
 }

export default Stamp;
