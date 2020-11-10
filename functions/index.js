const functions = require("firebase-functions");

const express = require("express");
const PORT = 3000;
const app = express();
const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const LAT = process.env.LAT ? process.env.LAT : "37.7700655";
const LON = process.env.LON ? process.env.LON : "-1.4990814";
const EXCLUDE = process.env.EXCLUDE ? process.env.EXCLUDE : "hourly,minutely";

const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&exclude=${EXCLUDE}&units=metric&lang=es&appid=${API_KEY}`;

app.get("/", (req, res, next) => {
  axios
    .get(url)
    .then((response) => {
      res.set("Cache-control", "public, max-age=120");
      res.send(response.data);
      return;
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});

exports.app = functions.region("europe-west6").https.onRequest(app);
