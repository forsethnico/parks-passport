import React, { useState } from 'react'
import './Form.css'
import PropTypes from 'prop-types'

function Form({queryParks}) {
    const [query, setQuery] = useState('')
    const [error, setError] = useState('')

    const clearInputs = () => {
        setQuery('')
        setError("")
    }

    const submitSearch = event => {
        event.preventDefault()
        if(query) {
        queryParks(query)
        clearInputs();
        } else {
            setError('Enter a search query')
        }
    }

    return (
        <form>
            <input type="text" className="search-query" placeholder="Enter park name or state" name='query' value={query} onChange={event => setQuery(event.target.value)}/>
            <button className ="search-btn" onClick={event => submitSearch(event)}>Search</button>
            {error && <h4>{error}</h4>}
        </form>
    )
}

Form.propTypes = {
    queryParks: PropTypes.func.isRequired
 }

export default Form;