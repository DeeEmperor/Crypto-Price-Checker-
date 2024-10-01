// The necessary dependencies for the project

import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

//Declaring my express app so i can run in local host
const app = express();
const port = 3000;

//The below is for rendering static css file to the ejs file
app.use(express.static("public"));

//parse form data
app.use(bodyParser.urlencoded({ extended: true }));

//coinmarket cap Api url and personal key
const API_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
const API_KEY = "f84f3547-4a0f-4468-8ad6-947e2cf9d697";

const headers = {
  "X-CMC_PRO_API_KEY": API_KEY,
};

//This renders the simple homepage(I learned to use null as like the value pair for the ejs "key"..more like a default setting)
app.get("/", (req, res) => {
  res.render("index.ejs", { price: null, error: null });
});

//The main code block of the project
//Intended to connect with the blockchain api
//Will make use of JS promise and axios
app.get("/check-price", async (req, res) => {
  const coin = req.query.coin;

  try {
    const result = await axios.get(API_URL, {
      headers,
      params: {
        symbol: coin.toUpperCase(),
        convert: "USD",
      },
    });

    const price = result.data.data[coin.toUpperCase()].quote.USD.price;

    res.render("index.ejs", {
      coin: coin.toUpperCase(),
      price: price.toFixed(3),
      error: null,
    });
  } catch (error) {
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
