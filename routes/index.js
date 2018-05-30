var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'thanhtran97',
	database: 'portfolio'
});

connection.connect();

router.get('/', function(req, res, next){
	connection.query("SELECT * FROM cateportfolio", function(err, rows, fields){
		if(err) throw err;
		res.render('index', {
			"cateportfolio": rows
		});
	});
});


router.get('/details/:id', function(req, res, next){
	connection.query("SELECT * FROM cateportfolio WHERE id = ?", req.params.id, function(err, rows, fields){
		if(err) throw err;
		res.render('details', {
			"cateportfolio": rows[0]			
		});
	});
});

module.exports = router;