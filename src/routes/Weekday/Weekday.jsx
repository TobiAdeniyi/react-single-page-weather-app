import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Container } from "@mui/material";
import { EightDayForeCastCard } from "../Home/components";
import { useParams } from "react-router-dom";
import { RouterContext } from "../../App";
import { DateWeatherCard } from "./components";

export default function Weekday() {
  const { isMetric, dailyForecastResponse } = useContext(RouterContext);
  const { date } = useParams();

  // define units
  const tempUnit = `˚${isMetric ? "C" : "F"}`;
  const windSpeedUnit = isMetric ? "m/s" : "mph";

  // get dated weather response based on url
  const dateWeatherResponse = dailyForecastResponse?.list.find((res) => {
    const newDate = new Date(res.dt * 1_000).toISOString().slice(0, 10);
    return newDate === date;
  });

  return !dateWeatherResponse || !dailyForecastResponse ? (
    <></>
  ) : (
    <Container>
      <Col>
        <DateWeatherCard
          tempUnit={tempUnit}
          windSpeedUnit={windSpeedUnit}
          city={dailyForecastResponse.city}
          dateWeatherResponse={dateWeatherResponse}
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
