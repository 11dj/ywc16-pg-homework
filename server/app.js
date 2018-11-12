const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const {
//   testJSON
// } = require('./services/test')

// external
app.use('/api/skyscanner', require('./services/skyscanner'))
app.use('/api/ip', require('./services/ip-api'))

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => {
  // testJSON()
  // console.log('Hi server')
  console.log(`Listening on port ${port}`)
});