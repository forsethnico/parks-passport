import React from 'react'
import PropTypes from 'prop-types'
import './Results.css'
import Card from '../Card/Card'

const Results = ({parks}) => {
    const parkCards = parks.map(park => {
        return (
            <Card
            name= {park.name}
            key= {park.id}
            parkCode={park.parkCode}
            url={park.images[0].url}
            />
        )
    })

    return (
        <section className= "filtered-parks-container">
            <div className="park-cards">{parkCards}</div>
        </section>
    )
}

Results.propTypes = {
    parks: PropTypes.array.isRequired
 }

export default Results