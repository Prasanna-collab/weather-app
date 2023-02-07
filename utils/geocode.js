import request from "request";



const geocode = (address, callback) => {
  const url =
    "https://geocode.maps.co/search?q=" + encodeURIComponent(address) + "";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback(
        "Unable to get connection with geocodemaps services.",
        undefined
      );
    } else if (body.length === 0) {
      callback(
        "Unable to get the Geocode. Please enter the valid address.",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body[0].lat,
        longitude: body[0].lon,
        location: body[0].display_name,
      });
    }
  });
};

export default geocode;
