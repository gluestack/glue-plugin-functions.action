module.exports = () => [
  {
    "path": "/backend/functions.action",
    "proxy": {
      "instance": "functions.action:3500",
      "path": "/v1.0/invoke/functions.action/method/"
    }
  }
];