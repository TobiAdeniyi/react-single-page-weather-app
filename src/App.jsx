import { useState, useEffect, StrictMode, createContext } from "react";
import { InputGroup, Container, FormControl, Col, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
// import "./App.css";

import { Navbar } from "./components";
import { Home, Weekday } from "./routes";

import {
  getWeatherApiUrl,
  getDailyForecastApiUrl,
  DEFAULT_PARAMS,
  rankIndex,
} from "./utils";

import * as CitiesJsonModule from "../cities.json";
const cities = CitiesJsonModule.default;

const RouterContext = createContext();
const NavigationContext = createContext();

function App() {
  const [city, setCity] = useState(null);
  const [position, setPosition] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isMetric, setIsMetric] = useState(DEFAULT_PARAMS.isMetric);

  // define queried weather data
  const [currentWeatherResponse, setCurrentWeatherResponse] = useState(null);
  const [dailyForecastResponse, setDailyForecastResponse] = useState(null);

  const navBarSearchToggleSubmissionHandler = ({ position = null } = {}) => {
    const longitude = position?.coords.longitude;
    const latitude = position?.coords.latitude;
    axios
      .get(getWeatherApiUrl({ city, latitude, longitude, isMetric }))
      .then((res) => setCurrentWeatherResponse(res.data))
      .catch((error) => console.error(error));
    axios
      .get(getDailyForecastApiUrl({ city, latitude, longitude, isMetric }))
      .then((res) => setDailyForecastResponse(res.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position);
      navBarSearchToggleSubmissionHandler({ position });
    });
  }, []);

  useEffect(() => {
    navBarSearchToggleSubmissionHandler({ position });
  }, [isMetric, position]);

  useEffect(() => {
    setFilteredCities(rankIndex(city ?? "", cities));
  }, [city]);

  return (
    <StrictMode>
      <BrowserRouter>
        <Row>
          <NavigationContext.Provider
            value={{
              setCity,
              setIsMetric,
              setFilteredCities,
              navBarSearchToggleSubmissionHandler,
            }}
          >
            <Navbar />
          </NavigationContext.Provider>
        </Row>
        <Row>
          <RouterContext.Provider
            value={{
              isMetric,
              currentWeatherResponse,
              dailyForecastResponse,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:date" element={<Weekday />} />
            </Routes>
          </RouterContext.Provider>
        </Row>
      </BrowserRouter>
    </StrictMode>
  );
}

export { App, RouterContext, NavigationContext };
