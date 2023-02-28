import { Card, CardContent, Typography } from "@mui/material";
import { Image, ListGroup } from "react-bootstrap";
import { getIcon } from "../utils";

const dateTimeOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const feelsLikePeriods = [
  { name: "morning", val: "morn" },
  { name: "afternoon", val: "day" },
  { name: "evening", val: "eve" },
  { name: "night", val: "night" },
];

export default function WeatherCard({ weatherResponse }) {
  const date = new Date(weatherResponse.date);
  return (
    <Card>
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {date.toLocaleDateString("en-UK", dateTimeOptions)},{" "}
          {date.toLocaleTimeString()}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {weatherResponse.name}, {weatherResponse.country}
        </Typography>
        <Image src={getIcon(weatherResponse.icon)} />
        {weatherResponse?.temp && (
          <Typography variant="h3" component="div">
            {Math.round(weatherResponse.temp)}
            {weatherResponse.tempUnit}
          </Typography>
        )}
        {weatherResponse?.temp_min && (
          <Typography variant="h3" component="div">
            Min: {Math.round(weatherResponse.temp_min)}
            {weatherResponse.tempUnit}
          </Typography>
        )}
        {weatherResponse?.temp_max && (
          <Typography variant="h3" component="div">
            Max: {Math.round(weatherResponse.temp_max)}
            {weatherResponse.tempUnit}
          </Typography>
        )}
        <ListGroup className="text-start" component="div">
          <ListGroup.Item key="precipitation">
            <Typography>
              Precipitation: {weatherResponse.percipitation}%
            </Typography>
          </ListGroup.Item>
          <ListGroup.Item key="humidity">
            <Typography>Humidity: {weatherResponse.humidity}%</Typography>
          </ListGroup.Item>
          <ListGroup.Item key="wind">
            <Typography>
              Wind Speed: {weatherResponse.windSpeed}{" "}
              {weatherResponse.windSpeedUnit}
            </Typography>
          </ListGroup.Item>
          <ListGroup.Item key="pressure">
            <Typography>Pressure: {weatherResponse.pressure} mb</Typography>
          </ListGroup.Item>
        </ListGroup>
        <Typography variant="body2" color="text.secondary">
          Today, we will have {weatherResponse.weatherDescription}.
        </Typography>
        {weatherResponse?.feelsLike && (
          <Typography variant="body2" color="text.secondary">
            Feel like {Math.round(weatherResponse.feelsLike)}
            {weatherResponse.tempUnit}.
          </Typography>
        )}
        {weatherResponse?.feelsLikeBreakdown &&
          feelsLikePeriods.map((period) => (
            <Typography
              variant="body2"
              color="text.secondary"
              key={`${period.name}-feels-like`}
            >
              The {period.name} will feel like{" "}
              {Math.round(weatherResponse.feelsLikeBreakdown?.[period.val])}{" "}
              {weatherResponse.tempUnit}.
            </Typography>
          ))}
      </CardContent>
    </Card>
  );
}
