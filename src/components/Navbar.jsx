import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { FormGroup, Switch, Typography, Stack } from "@mui/material";

import { getForecastApiUrl, getWeatherApiUrl } from "../utils";
import { NavigationContext } from "../App";

const DEFAULT_CITY = "london";
const DEFAULT_USEMETRIC = true;

export default function Navbar({ setWeatherApiUrl, setForecastApiUrl }) {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [useMetric, setUseMetric] = useState(DEFAULT_USEMETRIC);
  const { searchSubmissionHandler } = useContext(NavigationContext);

  useEffect(() => {
    // When city or metric is changed, update the search URLs
    const newWeatherApiUrl = getWeatherApiUrl(city, useMetric);
    setWeatherApiUrl(newWeatherApiUrl);
    const newForecastApiUrl = getForecastApiUrl(city, useMetric);
    setForecastApiUrl(newForecastApiUrl);
  }, [city, useMetric]);

  return (
    <Container>
      <Row className="mb-4">
        {/* Search */}
        <Col sm="8" md="6" className="mx-auto">
          <form
            onSubmit={(e) => {
              console.log("We're submitting");
              e.preventDefault();
              searchSubmissionHandler();
            }}
          >
            <InputGroup role="form">
              <Button
                type="submit"
                className="btn btn-primary btn-large centerButton"
              >
                <InputGroup.Text id="search">City</InputGroup.Text>
              </Button>
              <FormControl
                placeholder="London"
                aria-label="search"
                aria-describedby="search"
                onChange={(e) => setCity(e.target.value)}
              />
            </InputGroup>
          </form>
        </Col>
        {/* Switch: select unit format ("metric" or "imperial" for the Americans ) */}
        <Col sm="8" md="6" className="mx-auto">
          <FormGroup>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Imperial</Typography>
              <Switch
                defaultChecked
                onChange={(e) => setUseMetric(e.target.checked)}
              />
              <Typography>Metric</Typography>
            </Stack>
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
}
