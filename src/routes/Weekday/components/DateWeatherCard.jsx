import { WeatherCard } from "../../../components";

export default function DateWeatherCard({
  tempUnit,
  windSpeedUnit,
  city,
  dateWeatherResponse,
}) {
  return (
    <WeatherCard
      weatherResponse={{
        tempUnit,
        windSpeedUnit,
        date: dateWeatherResponse.dt * 1_000,
        name: city.name,
        country: city.country,
        icon: dateWeatherResponse.weather[0].icon,
        temp_min: dateWeatherResponse.temp.min,
        temp_max: dateWeatherResponse.temp.max,
        percipitation: dateWeatherResponse.clouds,
        humidity: dateWeatherResponse.humidity,
        windSpeed: dateWeatherResponse.speed,
        pressure: dateWeatherResponse.pressure,
        weatherDescription: dateWeatherResponse.weather.description,
        feelsLikeBreakdown: dateWeatherResponse.feels_like,
      }}
    />
  );
}
