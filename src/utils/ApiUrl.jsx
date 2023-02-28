import * as API_ID_JSON from "../../id.json";

const API_URL = "http://api.openweathermap.org";
const APP_ID = API_ID_JSON.api_id;

const BASE_URL = `${API_URL}/data/2.5/`;

const API_PARAM_OPTIONS = [
  { apiName: "q", internalName: "city" },
  { apiName: "lat", internalName: "latitude" },
  { apiName: "lon", internalName: "longitude" },
  { apiName: "units", internalName: "isMetric" },
  { apiName: "lang", internalName: "language" },
  { apiName: "cnt", internalName: "count" },
];

const DEFAULT_PARAMS = {
  city: "london", // name of city
  isMetric: true, // units (metric or imperial)
  language: "en", // language code (default: english)
};

// helper function
const getApiUrl = (route, providedValues) => {
  const stub = API_PARAM_OPTIONS.reduce((result, optionalParam) => {
    const val = // IF we're looking at units: set value manually (metric or imperial)
      optionalParam.apiName === "units"
        ? providedValues[optionalParam.internalName] // boolean: determin if we use imperial or metric measurment
          ? "metric"
          : "imperial"
        : providedValues[optionalParam.internalName]; // ELSE: set value automatically
    return result + (val ? `&${optionalParam.apiName}=${val}` : "");
  }, "");
  return `${BASE_URL}${route}?appid=${APP_ID}${stub}`;
};

/*
 *  ==================
 *  API URL Generators
 *  ==================
 *
 *  Examples:
 *  ---------
 *   getWeatherApiUrl:
 *     http://api.openweathermap.org/data/2.5/weather?appid=d94bcd435b62a031771c35633f9f310a&q=london&units=imperial&lang=en
 *
 *   getDailyForecastApiUrl:
 *     http://api.openweathermap.org/data/2.5/weather?appid=d94bcd435b62a031771c35633f9f310a&q=london&units=imperial&lang=en
 *
 *   getHourlyForecastApiUrl:
 *     TBD
 */

const getWeatherApiUrl = ({
  city = null,
  latitude = null,
  longitude = null,
  isMetric = DEFAULT_PARAMS.isMetric,
  language = DEFAULT_PARAMS.language,
} = {}) => {
  return getApiUrl("weather", {
    ...(longitude && latitude
      ? { longitude, latitude }
      : city
      ? { city }
      : { city: DEFAULT_PARAMS.city }),
    isMetric,
    language,
  });
};

const getDailyForecastApiUrl = ({
  city = null,
  latitude = null,
  longitude = null,
  isMetric = DEFAULT_PARAMS.isMetric,
  language = DEFAULT_PARAMS.language,
  count = 8, // 8 days of data (e.g. monday - monday)
} = {}) => {
  return getApiUrl("forecast/daily", {
    ...(longitude && latitude
      ? { longitude, latitude }
      : city
      ? { city }
      : { city: DEFAULT_PARAMS.city }),
    isMetric,
    language,
    count,
  });
};

const getHourlyForecastApiUrl = ({
  city = null,
  latitude = null,
  longitude = null,
  isMetric = DEFAULT_PARAMS.isMetric,
  language = DEFAULT_PARAMS.language,
  count = 30, // 30 hours of data (a day and 6 hours)
} = {}) => {
  return getApiUrl("forecast/hourly", {
    ...(longitude && latitude
      ? { longitude, latitude }
      : city
      ? { city }
      : { city: DEFAULT_PARAMS.city }),
    isMetric,
    language,
    count,
  });
};

export {
  DEFAULT_PARAMS,
  getWeatherApiUrl,
  getDailyForecastApiUrl,
  getHourlyForecastApiUrl,
};
