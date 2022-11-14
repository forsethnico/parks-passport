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
      {visitedParkCodes.length > 0 && parkStamps}
      {visitedParkCodes.length === 0 && <h2>Collection is empty. Go visit some parks!</h2>}
    </div>
    </section>
)}

Passport.propTypes = {
    visited: PropTypes.object.isRequired
 }

export default Passport;
