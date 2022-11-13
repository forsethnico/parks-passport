import React, { useEffect, useState } from "react";
import "./Stamp.css";
import { fetchSpecificPark } from "../../utilities/apiCalls";
import { Link } from "react-router-dom";
import postStamp from "../../assets/post-stamp.png";
import stamp from "../../assets/stamp.png";
import giantX from "../../assets/close.png";
import PropTypes from "prop-types";

const Stamp = ({ date, parkCode }) => {
  const [parkInfo, setParkInfo] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchSpecificPark(parkCode)
      .then((parkInfo) => {
        setParkInfo(parkInfo.data[0]);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [parkCode]);
  if (loaded) {
    return (
      <Link to={`/parks/${parkCode}`}>
        <section className="passport-stamp">
          <img
            src={parkInfo.images[0].url}
            alt="park scenery"
            className="park-stamp-image"
          />
          <img src={postStamp} alt="stamp border" className="overlay" />
          <div className="stamp-info">
            <h4 className="stamp-title">{parkInfo.name}</h4>
            <h4 className="stamp-date">{date}</h4>
          </div>
        </section>
      </Link>
    );
  } else if (error) {
    return (
      <Link to={`/parks/${parkCode}`}>
        <section className="passport-stamp">
          <img src={giantX} alt="error message" className="park-stamp-image" />
          <img src={postStamp} alt="stamp border" className="overlay" />
          <div className="stamp-info">
            <h4 className="stamp-title">Error</h4>
            <h4 className="stamp-date">Try again</h4>
          </div>
        </section>
      </Link>
    );
  } else {
    return (
      <Link to={`/parks/${parkCode}`}>
        <section className="passport-stamp">
          <img src={stamp} alt="loading stamp" className="park-stamp-image" />
          <img src={postStamp} alt="stamp border" className="overlay" />
          <div className="stamp-info">
            <h4 className="stamp-title">Loading...</h4>
            <h4 className="stamp-date">Loading...</h4>
          </div>
        </section>
      </Link>
    );
  }
};

Stamp.propTypes = {
  date: PropTypes.string.isRequired,
  parkCode: PropTypes.string.isRequired,
};

export default Stamp;
