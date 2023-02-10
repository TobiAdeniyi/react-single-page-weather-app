import { useState, useEffect, StrictMode, createContext } from "react";
import { InputGroup, Container, FormControl, Col, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
// import "./App.css";

import { Navbar } from "./components";
import { Home } from "./routes";

import {
  getWeatherApiUrl,
  getDailyForecastApiUrl,
  DEFAULT_PARAMS,
} from "./utils";

const RouterContext = createContext();
const NavigationContext = createContext();

function App() {
  const [city, setCity] = useState(DEFAULT_PARAMS.city);
  const [isMetric, setIsMetric] = useState(DEFAULT_PARAMS.isMetric);

  const [weatherResponse, setWeatherResponse] = useState(null);
  const [dailyForecastResponse, setDailyForecastResponse] = useState(null);

  const navBarSearchToggleSubmissionHandler = () => {
    axios
      .get(getWeatherApiUrl(city, isMetric))
      .then((res) => setWeatherResponse(res.data))
      .catch((error) => console.error(error));
    axios
      .get(getDailyForecastApiUrl(city, isMetric))
      .then((res) => setDailyForecastResponse(res.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    navBarSearchToggleSubmissionHandler();
  }, []);

  useEffect(() => {
    navBarSearchToggleSubmissionHandler();
  }, [isMetric]);

  return (
    <StrictMode>
      <BrowserRouter>
        <Row>
          <NavigationContext.Provider
            value={{
              setCity,
              setIsMetric,
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
              weatherResponse,
              dailyForecastResponse,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </RouterContext.Provider>
        </Row>
      </BrowserRouter>
    </StrictMode>
  );
}

export { App, RouterContext, NavigationContext };
