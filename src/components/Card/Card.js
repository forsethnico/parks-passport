import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({parkCode, name, url}) => {
    return (
        <Link to={`/parks/${parkCode}`}>
            <section className="park-card">
                <img src = {url} alt='park scenery' className="park-image"/>
                <h2 className="park-name">{name}</h2>
            </section>
        </Link>
    )
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    parkCode: PropTypes.string.isRequired
}

export default Card