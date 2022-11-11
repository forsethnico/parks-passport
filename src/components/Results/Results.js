import React from 'react'
import PropTypes from 'prop-types'
import './Results.css'
import Card from '../Card/Card'

const Results = ({filteredParks}) => {
    const parkCards = filteredParks.map(park => {
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
            {parkCards}
        </section>
    )
}

Results.propTypes = {
    filteredParks: PropTypes.array.isRequired
 }

export default Results