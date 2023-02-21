import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Container } from "@mui/material";
import { CurrentWeatherCard, EightDayForeCastCard } from "./components";
import { RouterContext } from "../../App";

export default function Home() {
  const { isMetric, currentWeatherResponse, dailyForecastResponse } =
    useContext(RouterContext);

  // define units
  const tempUnit = `˚${isMetric ? "C" : "F"}`;
  const windSpeedUnit = isMetric ? "m/s" : "mph";

  return !currentWeatherResponse || !dailyForecastResponse ? (
    <></>
  ) : (
    <Container>
      <Col>
        <CurrentWeatherCard
          tempUnit={tempUnit}
          windSpeedUnit={windSpeedUnit}
          currentWeatherResponse={currentWeatherResponse}
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
