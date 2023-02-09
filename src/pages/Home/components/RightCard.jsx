import { Card, CardContent, Typography } from "@mui/material";
import { Image, ListGroup } from "react-bootstrap";
import { getIcon } from "../../../utils";

export default function RightCard({ forecastResponse }) {
  const dateTimeOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  console.log(forecastResponse);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Week Forecast
        </Typography>
        <ListGroup className="text-start" component="div">
          {forecastResponse.list.map((forecast, idx) => {
            const date = new Date(forecast.dt * 1_000);
            return (
              <ListGroup.Item
                key={forecast.dt}
                className="d-flex justify-content-between align-items-start"
              >
                <Typography variant="body1">
                  {date.toLocaleDateString("en-UK", dateTimeOptions)}
                </Typography>
                <Image src={getIcon(forecast.weather[0].icon)} />
                <Typography variant="body2">
                  {forecast.main.temp_max}/{forecast.main.temp_min}
                  <sup>o</sup>C
                </Typography>
                <Typography variant="caption">
                  {forecast.weather[0].description}
                </Typography>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </CardContent>
    </Card>
  );
}
