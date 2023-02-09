const API_URL = "http://api.openweathermap.org";
const APP_ID = "d94bcd435b62a031771c35633f9f310a"; // todo: change key

const BASE_URL = `${API_URL}/data/2.5/`;

const getWeatherApiUrl = (city = "london", useMetric = true) => {
  const units = useMetric ? "metric" : "imperial";
  return `${BASE_URL}weather?q=${city}&units=${units}&appid=${APP_ID}`;
};

const getForecastApiUrl = (city = "london", useMetric = true, count = 8) => {
  const units = useMetric ? "metric" : "imperial";
  return `${BASE_URL}forecast?q=${city}&units=${units}&cnt=${count}&appid=${APP_ID}`;
};

export { getWeatherApiUrl, getForecastApiUrl };
/*
 * https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=d94bcd435b62a031771c35633f9f310a
 * https://api.openweathermap.org/data/2.5/forecast?q=london&units=metric&count=8&appid=d94bcd435b62a031771c35633f9f310a
 */
