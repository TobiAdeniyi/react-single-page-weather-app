import { useContext } from "react";
import { Container } from "@mui/material";

import { CurrentWeatherCard, EightDayForeCastCard } from "./components";
import { RouterContext } from "../../App";
import { Col, Row } from "react-bootstrap";

export default function Home() {
  const { isMetric, weatherResponse, dailyForecastResponse } =
    useContext(RouterContext);

  // define units
  const tempUnit = `˚${isMetric ? "C" : "F"}`;
  const windSpeedUnit = isMetric ? "m/s" : "mph";

  return !weatherResponse || !dailyForecastResponse ? (
    <></>
  ) : (
    <Container>
      <Col>
        <CurrentWeatherCard
          tempUnit={tempUnit}
          windSpeedUnit={windSpeedUnit}
          weatherResponse={weatherResponse}
        />
      </Col>
      <br />
      <Col>
        <EightDayForeCastCard
          tempUnit={tempUnit}
          dailyForecastResponse={dailyForecastResponse}
        />
      </Col>
    </Container>
  );
}
