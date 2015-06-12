var express = require('express');
var router = express.Router();

var pg=require('pg');
var conString ="postgres://peca:@localhost/PECA";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/app', function(req, res, next) {
  res.render('salida2', { title: 'SALIDA2' });
});

router.get('/pg',function(req, res, next) {
  
  var resultado=[];
  
  pg.connect(conString,function(err,client,done) {
    
    var query=client.query("SELECT meta_sid FROM tevento ORDER BY fecha_ini;");
    
    query.on('row',function(row) {
      resultado.push(row);
    });
    
    query.on('end',function(){
      client.end();
      return res.json(resultado);
    });
    
    if(err){
      console.log(err);
    }
    
  });
  
  //res.render('saldb',resultado);
});


module.exports = router;
