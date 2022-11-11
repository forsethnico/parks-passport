import React, { useState } from 'react'
import { stateNameToAbbreviation } from '../../utilities/states'
import './Form.css'

function Form(props) {
    const [query, setQuery] = useState('')

    const clearInputs = () => {
        setQuery('')
    }

    const submitSearch = event => {
        event.preventDefault()
        props.filterParksByQuery(query)
        clearInputs();
    }

    return (
        <form>
            <input type="text" placeholder="Search by park name or state" name='query' value={query} onChange={event => setQuery(event.target.value)}/>
            <button onClick={event => submitSearch(event)}>Search</button>
        </form>
    )
}

export default Form;