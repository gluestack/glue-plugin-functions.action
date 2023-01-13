const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/health-check', (req, res) => {
  return res.status(200).json({status: true, message: 'Health check performed successfully'});
});

app.post('/functions', (req, res) => {
  const { headers, body }  = req;

  // do something with the headers and body
  // perform your custom business logic
  console.log({ body });

  return res.status(200).json({
    status: true,
    message: 'Ok'
  });
});

app.listen(port, () => {
  console.log(`Action listening on port ${port}`)
});
