var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/api/bot', function (req, res) {
  var texto  = req.body.texto;
  var contexto = req.body.contexto;
  var options = {
	  /*json: {
		  texto:texto,
		  contexto:contexto
	  },*/
    json: req.body,
	  //url:'https://be-nodejs-bot-tramarsa.mybluemix.net/api/mensaje',
	  url:'https://be-nodejs-monitor-romero.mybluemix.net/api/buscar',
	  method:'POST'
  };

    request(options, function (error, response, body) {
	  console.log("Error en request: "+error);
	  console.log("Body en request: "+body);
	  console.log("Response en request: "+response);
	   return res.status(200).jsonp({
           //"watson": body.watson
           body
         });
	});

});

module.exports = router;
