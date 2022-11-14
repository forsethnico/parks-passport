import React, { useState, useEffect } from "react";
import "./ParkInfo.css";
import PropTypes from "prop-types";
import stamp from "../../assets/stamp.png";
import approved from "../../assets/approved.png"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {fetchSpecificPark} from '../../utilities/apiCalls'

function ParkInfo({ parkCode, addVisited, visited }) {
  const [parkInfo, setParkInfo] = useState({})
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("")
  const [visitDate, setVisitDate] = useState(new Date());

  useEffect(() => {
    fetchSpecificPark(parkCode)
    .then(response => {
      if (response.data.length > 0) {
        setParkInfo(response.data[0])
        setLoaded(true)
      } else {
        setError('Invalid park code');
      }
    })
  .catch(error => {
      setError(error.message)
    }
  )
  }, [parkCode]) 
  
  if(loaded) {
    const isVisited = Object.keys(visited).includes(parkCode)
    const parkAddress = parkInfo.addresses[0]
    const parkActivities = parkInfo.activities.map(
      (activity) => activity.name
    );
      return (
        <section className="individual-park-container">
          <section className="individual-park">
            <img
              src={parkInfo.images[0].url}
              alt="large park scenery"
              className="individual-park-image"
            />
            <h2 className="individual-park-name">{parkInfo.fullName}</h2>
            <section className="park-info">
              <p>Description: {parkInfo.description}</p>
              <p>Address: {`${parkAddress.line1}, ${parkAddress.city}, ${parkAddress.stateCode}`}</p>
              <p>Activities: {parkActivities.join(", ")}</p>
            </section>
            {isVisited &&
              <section className="visited">
                <img src={approved} alt="check mark" className="approval-check-image"/>
                <h4 className = "been-stamped">Passport stamped!</h4>
              </section>
            } 
            {!isVisited &&
            <section className="add-visited">
              <div className='date-picker'>
                <label htmlFor="visited">Date Visited:</label>
                <DatePicker
                  selected={visitDate}
                  name="visited"
                  maxDate = {Date.now()}
                  onChange={(date) => setVisitDate(date)}
                />
              </div>
              <button className="add-visit-btn" onClick={() => addVisited(parkCode, visitDate)}>
                Add to Passport
                <img className="stamp" src={stamp} alt="stamp" />
              </button>
            </section>
          }
          </section>
        </section>
      );
  } else if (error) {
    return (<h2 className='error-message'>{error}- sorry try again!</h2>);
  } else {
    return (<h2>Loading...</h2>)
  }
}

ParkInfo.propTypes = {
  parkCode: PropTypes.string.isRequired,
  addVisited: PropTypes.func.isRequired,
  visited: PropTypes.object.isRequired
};

export default ParkInfo;
