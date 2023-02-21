import { WeatherCard } from "../../../components";

export default function CurrentWeatherCard({
  tempUnit,
  windSpeedUnit,
  currentWeatherResponse,
}) {
  return (
    <WeatherCard
      weatherResponse={{
        tempUnit,
        windSpeedUnit,
        date: currentWeatherResponse.dt * 1_000,
        name: currentWeatherResponse.name,
        country: currentWeatherResponse.sys.country,
        icon: currentWeatherResponse.weather[0].icon,
        temp: currentWeatherResponse.main.temp,
        percipitation: currentWeatherResponse.clouds.all,
        humidity: currentWeatherResponse.main.humidity,
        windSpeed: currentWeatherResponse.wind.speed,
        pressure: currentWeatherResponse.main.pressure,
        weatherDescription: currentWeatherResponse.weather[0].description,
        feelsLike: currentWeatherResponse.main.feels_like,
      }}
    />
  );
}
