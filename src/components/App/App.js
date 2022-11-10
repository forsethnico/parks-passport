import React, { useEffect, useState } from 'react';
import { fetchAllParks } from '../../utilities/apiCalls'
import './App.css'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import Form from '../Form/Form'
import Results from '../Results/Results'
import ParkInfo from '../ParkInfo/ParkInfo';
import Passport from '../Passport/Passport';
import forest from '../../assets/forest-background.jpg'

function App() {
    const [error, setError] = useState(null)
    const [parks, setParks] = useState([])
    const [filteredParks, setFiltered] = useState([])
    const [visited, setVisited] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
      fetchAllParks() 
      .then(parks => {
          setIsLoaded(true)
          console.log(parks.data)
          setParks(parks.data)
        })
      .catch(error => {
          setIsLoaded(true)
          setError(error)
        }
      )
    }, [])

    const filterParkByQuery = (query) => {
      const foundParks = parks.filter(park => {
        const lowerCaseQ = query.toLowerCase()
        return park.fullName.toLowerCase().includes(lowerCaseQ) || park.states.toLowerCase().includes(lowerCaseQ)
      })
      setFiltered(foundParks)
    }

      return (
        <main className = "App">
          <nav>
            <NavLink to ="/" style={{textDecoration: "none"}}>
              <div className = "logo-title">
                <img src = {forest} className="logo" alt="picnic table logo"/>
                <h1 className = "app-title">National Parks Passport</h1>
              </div>
            </NavLink>
          </nav>
          <Switch>
            <Route exact path="/passport" render={()=> {
              <Passport visited={visited} parks={parks}/>
            }}
            />
            <Route exact path= "/parks/:park"
            render={({match}) => {
              return (
                <ParkInfo parks={parks} name= {match.params.fullName}/>
              )
            }}
            />
             <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>

          <Form filterParks = {filterParkByQuery}/>
          <Results filteredParks = {filteredParks}/>
          {error && <h2>{error}</h2>}
          {!error && !parks.length && 
          <h2>Loading...</h2>
          }
        </main>
      )
    }
  

export default App;
