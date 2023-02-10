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

import { NavigationContext } from "../App";
import { DEFAULT_PARAMS } from "../utils";

export default function Navbar() {
  const { setCity, setIsMetric, navBarSearchToggleSubmissionHandler } =
    useContext(NavigationContext);

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
                onChange={(e) => setCity(e.target.value)}
              />
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
      </Row>
    </Container>
  );
}
