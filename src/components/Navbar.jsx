import { useContext } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { FormGroup, Switch, Typography, Stack } from "@mui/material";
import { Typeahead } from "react-bootstrap-typeahead";
import { NavigationContext } from "../App";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  const stub = location.pathname.split("/").at(-1);
  const {
    setCity,
    setIsMetric,
    setFilteredCities,
    navBarSearchToggleSubmissionHandler,
  } = useContext(NavigationContext);

  const rankCities = (city, Fil) => {};

  return (
    <Container>
      <Row className="mb-4">
        {/* Search */}
        <Col sm="8" md="6" className="mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navBarSearchToggleSubmissionHandler();
            }}
          >
            <InputGroup role="form">
              <FormControl
                placeholder="London"
                aria-label="search"
                aria-describedby="search"
                onChange={(e) => setCity(e.target.value.toLocaleLowerCase())}
              />
              {
                // See: https://ericgio.github.io/react-bootstrap-typeahead/
                /* <Typeahead
                  id="basic-typeahead-single"
                  labelKey="name"
                  placeholder="City..."
                  options={cityNames}
                  selected={filteredCities}
                  onChange={setFilteredCities}
                /> */
              }
              <Button
                id="search"
                type="submit"
                variant="outline-secondary"
                className="btn btn-primary btn-large centerButton"
              >
                City
              </Button>
            </InputGroup>
          </form>
        </Col>
        {/* Switch: select unit format ("metric" or "imperial" for USA!!) */}
        <Col sm="8" md="6" className="mx-auto">
          <FormGroup>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Imperial</Typography>
              <Switch
                defaultChecked
                onChange={(e) => setIsMetric(e.target.checked)}
              />
              <Typography>Metric</Typography>
            </Stack>
          </FormGroup>
        </Col>
        <Col>
          <Link to="">Home</Link>
          {/** TODO: only renders last stub in path */}
          {location.pathname !== "/" ? (
            <>
              <> / </>
              <Link to={location.pathname}>
                {stub[0].toUpperCase()}
                {stub.slice(1)}
              </Link>
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
}
