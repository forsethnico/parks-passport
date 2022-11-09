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

Results.PropTypes = {
    filteredParks: PropTypes.array.isRequired
 }

export default Results