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
    // const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
      console.log('test')
      fetchAllParks() 
      .then(parks => {
          // setIsLoaded(true)
          console.log(parks.data)
          setParks(parks.data)
        })
      .catch(error => {
          console.log(error)
          // setIsLoaded(true)
          setError(error)
        }
      )
    }, [])

    const filterParksByQuery = (query) => {
      const foundParks = parks.filter(park => {
        const lowerCaseQ = query.toLowerCase()
        return park.fullName.toLowerCase().includes(lowerCaseQ) || park.states.toLowerCase().includes(lowerCaseQ)
      })
      setFiltered(foundParks)
    }

    const findSelectedPark = (parkCode) => {
      return parks.find(park => park.parkCode === parkCode)
    }

    const addVisited = (id, date) => {
      setVisited({...visited, [id]:date})
    }

      return (
        <main className = "App">
          <nav>
            <NavLink to ="/" style={{textDecoration: "none"}}>
              <div className = "logo-title">
                {/* <img src = {forest} className="logo" alt="picnic table logo"/> */}
                <h1 className = "app-title">National Parks Passport</h1>
              </div>
            </NavLink>
          </nav>
          {!error && (
          <Switch>
            <Route exact path="/">
              <div className="main-page">
                  <Form filterParksByQuery = {filterParksByQuery}/>
                  <Results filteredParks = {filteredParks}/>
              </div>
            </Route>
            <Route exact path="/passport" render={() => (
              <Passport visited={visited} parks={parks}/>
            )}
            />
            <Route exact path= "/parks/:parkCode"
            render={({match}) => {
              return (
                <ParkInfo selectedPark= {findSelectedPark(match.params.parkCode)} addVisited={addVisited}/>
              )
            }}
            />
             <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
          )}
          {error && <h2>{error}</h2>}
          {!error && !parks.length && 
          <h2>Loading...</h2>
          }
        </main>
      )
    }
  

export default App;
