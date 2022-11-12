import React from "react";
import "./Passport.css";
import Stamp from "../Stamp/Stamp";
import PropTypes from 'prop-types'

function Passport({ visited }) {
  const visitedParkCodes = Object.keys(visited);

  const parkStamps = visitedParkCodes.map((parkCode) => {
    return (
      <Stamp
        date={visited[parkCode].toDateString()}
        key={parkCode}
        parkCode = {parkCode}
      />
    );
  });
  return (<section className="passport-stamp-container">
    <div className ="stamp-cards">
      {parkStamps}
    </div>
    </section>
)}

Passport.propTypes = {
    visited: PropTypes.object.isRequired
 }

export default Passport;
