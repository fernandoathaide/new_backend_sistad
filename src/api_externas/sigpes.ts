var request = require('request');
request('http://api.servicos.homolog.ccarj.intraer/sigpesApi/pessoaFisicas/7273142', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  var parsedWeather = JSON.parse(body);
  console.log(parsedWeather); // Print the Temperature in the city of São Paulo
});