const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const router = express.Router();

router.get("/getIP", (req, res) => {
  console.log('getting IP')
  axios({
    method: "get",
    url: 'http://api.db-ip.com/v2/free/self/ipAddress'
  })
    .then(function(response) {
      // res.send(response.data);
      console.log(response.data)
      axios({
        method: "get",
        url: `http://api.db-ip.com/addrinfo?api_key=bc2ab711d740d7cfa6fcb0ca8822cb327e38844f&addr=${response.data}`
      })
        .then(function(response) {
          res.send(response.data);
        })
        .catch(error => {
          res.send(error.message);
        });
    })
    .catch(error => {
      res.send(error.message);
    });
});

module.exports = router;