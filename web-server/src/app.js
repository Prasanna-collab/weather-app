import express from "express";
import path from "path";
import geocode from "./utils/geocode.js";
import weatherstack from "./utils/weatherstack.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import hbs from "hbs";
const app = express();

//define paths for express config.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(__dirname) //console.log(__filename)
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//to setting up the engine(view engine and the engine name should be set. then only express
//going to know what is happening whenver we use the hbs engine.)
//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//redner method used to call one of the views(hbs templates called views) by calling it's name.
// name sensitive.
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Prasanna",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Prasanna",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Docs",
    name: "Prasanna",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide valid address to get the weather.",
    });
  } else {
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
      if (error) {
        return res.send({ error });
      }
      weatherstack(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast,
          location,
          address: req.query.address,
        });
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Prasanna",
  });
});
app.get("*", (req, res) => {
  res.render("404", { title: "404", name: "Prasanna" });
});

app.listen(3000, () => {
  console.log("Server is up in 3000");
});
