import { Card, CardContent, Typography } from "@mui/material";
import { Image, ListGroup } from "react-bootstrap";
import { getIcon } from "../../../utils";

export default function EightDayForecastCard({
  tempUnit,
  dailyForecastResponse,
}) {
  const dateTimeOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const subtitleDateOptions = { month: "short", day: "numeric" };
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Eight Day Forecast
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {new Date(
            dailyForecastResponse.list[0].dt * 1_000
          ).toLocaleDateString("en-UK", subtitleDateOptions)}{" "}
          -{" "}
          {new Date(
            dailyForecastResponse.list.slice(-1)[0].dt * 1_000
          ).toLocaleDateString("en-UK", subtitleDateOptions)}
        </Typography>
        <br />
        <ListGroup
          as="ul"
          variant="flush"
          className="text-start"
          component="div"
        >
          {dailyForecastResponse.list.map((forecast, idx) => {
            const date = new Date(forecast.dt * 1_000);
            const content = (
              <>
                <Typography variant="body1">
                  {date.toLocaleDateString("en-UK", dateTimeOptions)}
                </Typography>
                <Image src={getIcon(forecast.weather[0].icon)} />
                <Typography variant="body2">
                  {Math.round(forecast.temp.min)} /{" "}
                  {Math.round(forecast.temp.max)}
                  {tempUnit}
                </Typography>
                <Typography variant="caption">
                  {forecast.weather[0].description}
                </Typography>
              </>
            );
            return idx === 0 ? (
              <ListGroup.Item
                active
                key={`forcast-${idx + 1}-${forecast.dt}`}
                className="d-flex justify-content-between align-items-start"
              >
                {content}
              </ListGroup.Item>
            ) : (
              <ListGroup.Item
                key={`forcast-${idx + 1}-${forecast.dt}`}
                className="d-flex justify-content-between align-items-start"
              >
                {content}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </CardContent>
    </Card>
  );
}
