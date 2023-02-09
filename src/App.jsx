import { useState, useEffect, StrictMode, createContext } from "react";
import { InputGroup, Container, FormControl, Col, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";

import { Navbar } from "./components";
import { Home } from "./pages/Home";
import { getWeatherApiUrl, getForecastApiUrl } from "./utils";

const RouterContext = createContext();
const NavigationContext = createContext();

function App() {
  const [weatherApiUrl, setWeatherApiUrl] = useState(getWeatherApiUrl());
  const [forecastApiUrl, setForecastApiUrl] = useState(getForecastApiUrl());

  const [weatherResponse, setWeatherResponse] = useState(null);
  const [forecastResponse, setForecastResponse] = useState(null);

  const searchSubmissionHandler = () => {
    axios
      .get(weatherApiUrl)
      .then((res) => setWeatherResponse(res.data))
      .catch((error) => console.error(error));
    axios
      .get(forecastApiUrl)
      .then((res) => setForecastResponse(res.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    searchSubmissionHandler();
  }, []);
  return (
    <StrictMode>
      <BrowserRouter>
        <NavigationContext.Provider value={{ searchSubmissionHandler }}>
          <Navbar
            setWeatherApiUrl={setWeatherApiUrl}
            setForecastApiUrl={setForecastApiUrl}
          />
        </NavigationContext.Provider>
        <RouterContext.Provider
          value={{
            weatherResponse,
            forecastResponse,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </RouterContext.Provider>
      </BrowserRouter>
    </StrictMode>
  );
}

export { App, RouterContext, NavigationContext };
