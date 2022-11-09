import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({name, url}) => {
    return (
        <section className="park-card">
            <img src = {url} alt='park scenery' className="park-image"/>
            <h2 className="park-name">{name}</h2>
        </section>
    )
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default Card