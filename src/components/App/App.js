import React, { useState } from "react";
import { fetchParkQuery } from "../../utilities/apiCalls";
import "./App.css";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import Form from "../Form/Form";
import Results from "../Results/Results";
import ParkInfo from "../ParkInfo/ParkInfo";
import Passport from "../Passport/Passport";
import logo from "../../assets/header.png";
import passport from "../../assets/parksPassport.png";

function App() {
  const [error, setError] = useState(null);
  const [parks, setParks] = useState([]);
  const [visited, setVisited] = useState({});

  const queryParks = (query) => {
    fetchParkQuery(query)
      .then((parkData) => {
        setParks(parkData.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const addVisited = (parkCode, date) => {
    if (!Object.keys(visited).includes(parkCode)) {
      setVisited({ ...visited, [parkCode]: date });
    }
  };

  return (
    <main className="App">
      <nav>
        <NavLink to="/">
          <img src={logo} className="logo" alt="passport header" />
        </NavLink>
        <NavLink to="/passport">
          <img src={passport} className="passport-link" alt="passport" />
        </NavLink>
      </nav>
        <Switch>
          <Route exact path="/">
            <div className="main-page">
              <Form queryParks={queryParks} />
              {!error && <Results parks={parks} />}
              {error && <h4 className="error-message">{error}- sorry try again!</h4>}
            </div>
          </Route>
          <Route
            exact
            path="/passport"
            render={() => <Passport visited={visited} />}
          />
          <Route
            exact
            path="/parks/:parkCode"
            render={({ match }) => {
              return (
                <ParkInfo
                  parkCode={match.params.parkCode}
                  addVisited={addVisited}
                  visited={visited}
                />
              );
            }}
          />
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
    </main>
  );
}

export default App;
