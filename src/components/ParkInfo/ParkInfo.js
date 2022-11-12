import React, { useState } from "react";
import "./ParkInfo.css";
import PropTypes from "prop-types";
import stamp from "../../assets/stamp.png";
import approved from "../../assets/approved.png"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ParkInfo({ selectedPark, addVisited, visited }) {
  const [visitDate, setVisitDate] = useState(new Date());
  const isVisited = Object.keys(visited).includes(selectedPark.id)
  const parkAddress = selectedPark.addresses[0]
  const parkActivities = selectedPark.activities.map(
    (activity) => activity.name
  );
  if (selectedPark) {
    return (
      <section className="individual-park-container">
        <section className="individual-park">
          <img
            src={selectedPark.images[0].url}
            alt="large park scenery"
            className="individual-park-image"
          />
          <h2 className="individual-park-name">{selectedPark.fullName}</h2>
          <section className="park-info">
            <p>Description: {selectedPark.description}</p>
            <p>Address: {`${parkAddress.line1}, ${parkAddress.city}, ${parkAddress.stateCode}`}</p>
            <p>Activities: {parkActivities.join(", ")}</p>
          </section>
          {isVisited &&
            <section className="visited">
              <img src={approved} alt="check mark" className="approval-check-image"/>
              <h4>Passport stamped!</h4>
            </section>
          } 
          {!isVisited &&
          <section className="add-visited">
            <label htmlFor="visited">Date Visited:</label>
            <DatePicker
              selected={visitDate}
              name="visited"
              onChange={(date) => setVisitDate(date)}
            />
            <button onClick={() => addVisited(selectedPark.id, visitDate)}>
              Add to Passport
              <img className="stamp" src={stamp} alt="stamp" />
            </button>
          </section>
        }
        </section>
      </section>
    );
  } else {
    return <h2>No park info available!</h2>;
  }
}

ParkInfo.propTypes = {
  selectedPark: PropTypes.object.isRequired,
  addVisited: PropTypes.func.isRequired,
  visited: PropTypes.object.isRequired
};

export default ParkInfo;
