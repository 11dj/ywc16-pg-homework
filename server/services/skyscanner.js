const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const {
  getCheapPrice, getFlightinBudget
} = require('./action')

const router = express.Router();

const urlx = "https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices";
const skytool = "/v1.0/TH/THB/th"
const url2 = "https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/browsedates/v1.0/TH/THB/en-US/DMK-sky/NRT-sky/anytime/anytime";
const xMashapeKey = "gQ7G3dfg3ymshyWBYhtNvNHIgYLZp1w8AWCjsnVHweJ27y7Cmu";
const xMashapeHost = "skyscanner-skyscanner-flight-search-v1.p.mashape.com";
const headerx = {
  "X-Mashape-Key": xMashapeKey,
  "X-Mashape-Host": xMashapeHost
}

router.post("/getSky", async (req, res) => {
  let { origin, keyword } = req.body
  axios({
    method: "get",
    url: `${urlx}/autosuggest${skytool}/?query=${keyword}`,
    headers: headerx
  }).then(function(response) {
    axios({
      method: "get",
      url: `${urlx}/browsedates${skytool}/${origin}-ip/${response.data.Places[0].PlaceId}/anytime/anytime`,
      headers: headerx
    })
      .then(function(resp) {
        res.send({
          main: getCheapPrice(resp.data),
          destination: response.data.Places[0].PlaceName
        })
      })
      .catch(err => {
        res.status(500).send('7' + err.message);
      })
  })
  .catch(error => {
    res.status(500).send('1' + error.message);
  });
})
.post("/getBudget", async (req, res) => {
  let { origin, budget } = req.body
  console.log('yeah')
  axios({
    method: "get",
    url: `${urlx}/browsequotes${skytool}/${origin}-ip/Anywhere/anytime/anytime`,
    headers: headerx
  }).then(function(response) {
    res.send(getFlightinBudget(response.data, budget))
  })
  .catch(error => {
    res.send(error.message);
  });
})
.post("/getCheap", (req, res) => {
  let { origin, destination } = req.body
  console.log('rrrr')
  axios({
    method: "get",
    url: `${urlx}/browsedates${skytool}/${origin}-ip/${destination}/anytime/anytime`,
    headers: headerx
  })
    .then(function(response) {
      res.send(getCheapPrice(response.data))
    })
    .catch(error => {
      res.send(error.message);
    });
})

module.exports = router;
