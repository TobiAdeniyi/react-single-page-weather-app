import { useContext } from "react";
import { Container } from "@mui/material";

import { LeftCard, RightCard } from "./components";
import { RouterContext } from "../../App";

export function Home() {
  const { weatherResponse, forecastResponse } = useContext(RouterContext);
  return !weatherResponse || !forecastResponse ? (
    <></>
  ) : (
    <Container>
      <LeftCard weatherResponse={weatherResponse} />
      <RightCard forecastResponse={forecastResponse} />
    </Container>
  );
}
