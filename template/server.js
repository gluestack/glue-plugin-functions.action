const express = require('express');

const app = express();
const port = 9000;

app.get('/health-check', (req, res) => {
  return res.status(200).json({status: true, message: 'Health check performed successfully'});
});

app.post('/functions/:call_option/:name', (req, res) => {
  const { call_option, name } = req.params;

  const { headers }  = req;
  const { input } = req.body;

  // validate headers for authentication &
  // perform your custom business logic

  // return the response
  return res.status(200).json({
    ...input
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
