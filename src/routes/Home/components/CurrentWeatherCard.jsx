import { Card, CardContent, Typography } from "@mui/material";
import { Image, ListGroup } from "react-bootstrap";
import { getIcon } from "../../../utils";

export default function CurrentWeatherCard({
  tempUnit,
  windSpeedUnit,
  weatherResponse,
}) {
  const date = new Date(weatherResponse.dt * 1_000);
  const dateTimeOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {date.toLocaleDateString("en-UK", dateTimeOptions)},{" "}
          {date.toLocaleTimeString()}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {weatherResponse.name}, {weatherResponse.sys.country}
        </Typography>
        <Image src={getIcon(weatherResponse.weather[0].icon)} />
        <Typography variant="h3" component="div">
          {Math.round(weatherResponse.main.temp)}
          {tempUnit}
        </Typography>
        <ListGroup className="text-start" component="div">
          <ListGroup.Item key="precipitation">
            <Typography>
              Precipitation: {weatherResponse.clouds.all}%
            </Typography>
          </ListGroup.Item>
          <ListGroup.Item key="humidity">
            <Typography>Humidity: {weatherResponse.main.humidity}%</Typography>
          </ListGroup.Item>
          <ListGroup.Item key="wind">
            <Typography>
              Wind Speed: {weatherResponse.wind.speed} {windSpeedUnit}
            </Typography>
          </ListGroup.Item>
          <ListGroup.Item key="pressure">
            <Typography>
              Pressure: {weatherResponse.main.pressure} mb
            </Typography>
          </ListGroup.Item>
        </ListGroup>
        <Typography variant="body2" color="text.secondary">
          Today, we will have {weatherResponse.weather[0].description}.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Feel like {Math.round(weatherResponse.main.feels_like)}
          {tempUnit}.
        </Typography>
      </CardContent>
    </Card>
  );
}
