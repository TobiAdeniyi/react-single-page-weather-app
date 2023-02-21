const API_URL = "http://api.openweathermap.org";
const APP_ID = "d94bcd435b62a031771c35633f9f310a"; // todo: change key

const BASE_URL = `${API_URL}/data/2.5/`;

const API_PARAM_OPTIONS = [
  { apiName: "q", internalName: "city" },
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
const getApiUrl = (stub, providedValues) => {
  const queryStub = API_PARAM_OPTIONS.reduce((result, optionalParam) => {
    const val = // IF we're looking at units: set value manually (metric or imperial)
      optionalParam.apiName === "units"
        ? providedValues[optionalParam.internalName] // boolean: determin if we use imperial or metric measurment
          ? "metric"
          : "imperial"
        : providedValues[optionalParam.internalName]; // ELSE: set value automatically
    return result + (val ? `&${optionalParam.apiName}=${val}` : "");
  }, "");
  return `${BASE_URL}${stub}?appid=${APP_ID}${queryStub}`;
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
  city = DEFAULT_PARAMS.city,
  isMetric = DEFAULT_PARAMS.isMetric,
  language = DEFAULT_PARAMS.language,
} = {}) => {
  return getApiUrl("weather", { city, isMetric, language });
};

const getDailyForecastApiUrl = ({
  city = DEFAULT_PARAMS.city,
  isMetric = DEFAULT_PARAMS.isMetric,
  language = DEFAULT_PARAMS.language,
  count = 8, // 8 days of data (e.g. monday - monday)
} = {}) => {
  return getApiUrl("forecast/daily", { city, isMetric, language, count });
};

const getHourlyForecastApiUrl = ({
  city = DEFAULT_PARAMS.city,
  isMetric = DEFAULT_PARAMS.isMetric,
  language = DEFAULT_PARAMS.language,
  count = 30, // 30 hours of data (a day and 6 hours)
} = {}) => {
  return getApiUrl("forecast/hourly", { city, isMetric, language, count });
};

export {
  DEFAULT_PARAMS,
  getWeatherApiUrl,
  getDailyForecastApiUrl,
  getHourlyForecastApiUrl,
};
