import React, {useState} from 'react'
import './ParkInfo.css'
import PropTypes from 'prop-types'
import stamp from '../../assets/stamp.png'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


function ParkInfo({selectedPark, addVisited}) {
    const [visitDate, setVisitDate]= useState(new Date())
    const parkActivities = selectedPark.activities.map(activity => activity.name)
    if(selectedPark) {
        return (
            <section className="individual-park">
                <section className="individual-park-container">
                    <img src={selectedPark.url} alt="large park scenery" className="individual-park-image"/>
                    <h2 className="individual-park-name">{selectedPark.fullName}</h2>
                    <section className="park-info">
                        <p>Description:{selectedPark.description}</p>
                        <p>Address:{selectedPark.addresses[0]}</p>
                        <p>Directions:{selectedPark.directions}</p>
                        <p>Activities: {parkActivities}</p>
                    </section>
                    <section className='add-visited-btn'>
                        <label for="visited">Date Visited:</label>
                        <DatePicker selected={visitDate} onChange={(date) => setVisitDate(date)}/>
                        <button onClick={() => addVisited(selectedPark.id, visitDate) }>
                                Add to Passport
                                <img className="stamp" src={stamp} atl="stamp"/>
                            </button>
                    </section>
                </section>
            </section>
        )
    } else {
        return <h2>No park info available!</h2>
    }    
}

ParkInfo.propTypes = {
    selectedPark: PropTypes.array.isRequired,
    addVisited: PropTypes.func.isRequired
 }

export default ParkInfo;