import chalk from "chalk";
import geocode from "./utils/geocode.js";
import weatherstack from "./utils/weatherstack.js";
import express from 'express';
const address = process.argv[2];

    // 1. Callback chaining for both functions.
    // 2. Weather Data from WeatherStack Api.
    // 3. GeoLocations Data from geocodemaps Api.

if(!address){
  console.log("Please Provide an address")
}else {
  geocode(address, (error, {latitude,longitude,location}={}) => {
    if (error) {
     return console.log(error)
    }
    weatherstack(latitude,longitude, (error, forcastData) => {
      if (error) {
        return console.log(error)
      }
      console.log(location);
      console.log(forcastData);
    });
  });
}




