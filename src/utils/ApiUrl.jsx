const API_URL = "http://api.openweathermap.org";
const APP_ID = "d94bcd435b62a031771c35633f9f310a"; // todo: change key

const BASE_URL = `${API_URL}/data/2.5/`;

const DEFAULT_PARAMS = {
  city: "london",
  isMetric: true,
};

const getWeatherApiUrl = (
  city = DEFAULT_PARAMS.city,
  isMetric = DEFAULT_PARAMS.isMetric
) => {
  const units = isMetric ? "metric" : "imperial";
  return `${BASE_URL}weather?q=${city}&units=${units}&appid=${APP_ID}`;
};

const getDailyForecastApiUrl = (
  city = DEFAULT_PARAMS.city,
  isMetric = DEFAULT_PARAMS.isMetric,
  count = 8
) => {
  const units = isMetric ? "metric" : "imperial";
  return `${BASE_URL}forecast/daily?q=${city}&units=${units}&cnt=${count}&appid=${APP_ID}`;
};

export { DEFAULT_PARAMS, getWeatherApiUrl, getDailyForecastApiUrl };
/*
 * https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=d94bcd435b62a031771c35633f9f310a
 * https://api.openweathermap.org/data/2.5/forecast/daily?q=london&units=metric&count=8&appid=d94bcd435b62a031771c35633f9f310a
 */
