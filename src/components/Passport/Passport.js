import React from "react";
import "./Passport.css";
import Stamp from "../Stamp/Stamp";
import PropTypes from 'prop-types'

function Passport({ visited, parks }) {
  const visitedIDs = Object.keys(visited);
  const visitedParks = parks.filter((park) => visitedIDs.includes(park.id));
  const parkStamps = visitedParks.map((park) => {
    return (
      <Stamp
        url={park.images[0].url}
        name={park.fullName}
        date={visited[park.id]}
      />
    );
  });
  return <section className="passport-stamp-container">{parkStamps}</section>;
}

Passport.propTypes = {
    parks: PropTypes.array.isRequired,
    visited: PropTypes.object.isRequired
 }

export default Passport;
