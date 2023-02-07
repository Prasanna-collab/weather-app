import request from "request";

const weatherstack = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0eca776c384e7216337ff44e2ad3be0f&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback(
        "Unable to find location. Please Enter valid geocode to the endpoint.",
        undefined
      );
    } else {
      callback(
        undefined,

        "There is " +
          body.current.weather_descriptions +
          " out there. " +
          "It is currently " +
          body.current.temperature +
          " degree faranheit temperature out. There is a " +
          body.current.precip +
          "% chance of rain today." +
          " The cloud cover is " +
          body.current.cloudcover +
          "%. Forecast observation time is " +
          body.current.observation_time +
          "."
      );
      // console.log(body.current);
    }
  });
};

export default weatherstack;
