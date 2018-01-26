// Load libs.
var Cloudant = require('cloudant');
var express  = require('express');
var router   = express.Router();

// Cloudant credentials
var me = '40174688-2f7b-418d-b759-a46a7465226b-bluemix';
var password = '6357494fc792567af662434a562cf5091712b4bb52c7f58b5c28ec8970fa49d5';
var cloudant = Cloudant({account:me, password:password});

 // Set database
 var mydb = cloudant.db.use("db_monitor");

// URI: '/api/buscar'
router.post('/api/buscar', function (req, res)
  {
    console.log('entro API Monitor local:' + new Date().toISOString());

    var texto  = texto;
    var contexto = req.body.contexto;
    var fechaActual = new Date();

    // Read params
    var querySearch = '';
    var pMsgId      = req.body.msgId;
    var pFecMin     = req.body.fecMin;
    var pFecMax     = req.body.fecMax;
    var pSociedad   = req.body.sociedad;

    // Build search query
    if (! (pMsgId == null || pMsgId == "") )
    querySearch = 'msgId:' + pMsgId + ' AND ';

    if ((! (pFecMin == null || pFecMin == "") ) && (! (pFecMax == null || pFecMax == "") ))
    querySearch = querySearch + 'datetime:[' + pFecMin + ' TO ' + pFecMax + '] AND ';

    if (! (pSociedad == null || pSociedad == "") )
    querySearch = querySearch + 'sociedad:"' + pSociedad + '" AND ';

    // Validate 'querySearch'
    if ( (querySearch == null) || (querySearch == "") )
    {
      return res.status(200).jsonp({
        "monitor":
        {
          "codigo" : 0,
          "descripcion" : "parametros incorrectos"
        }
      });
    }

    // Complete search query
    var lastIndex = querySearch.lastIndexOf(" ") - 4;
    querySearch = querySearch.substring(0, lastIndex);

    // Exec search query
    mydb.search('app', 'sidxMonitor', {q : querySearch}, function(err, result) {
      if (err) {
          console.log('[db.search]', err.message);
          return res.status(200).jsonp({
            "monitor":
            {
              "codigo" : 0,
              "descripcion" : "error en la ejecucion del query",
              "errorMessage" : err.message
            }
          });
      }

      // resp OK
      return res.status(200).jsonp({
        "total_rows":result.total_rows,
        "rows":result.rows
      });

    });

  }); // END POST function


module.exports = router;