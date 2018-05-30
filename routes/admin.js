var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images/portfolio'});
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'yourpassword',
	database: 'portfolio'
});

connection.connect();

router.get('/', function(req, res, next){
	connection.query("SELECT * FROM cateportfolio", function(err, rows, fields){
		if(err) throw err;
		res.render('admin/index', {
			"cateportfolio": rows,
			'success_msg' : req.flash('success_msg')
		});
	});
});

router.get('/add', function(req, res, next){
	res.render('admin/add');
});

router.post('/add', upload.single('projectimage'), function(req, res){
	var title = req.body.title;
	var service = req.body.service;
	var client = req.body.client;
	var description = req.body.description;
	var url = req.body.url;
	var projectdate = req.body.projectdate;

	//check image upload
	//if the image is there, we're going to put the filename into projectImageName variable
	if(req.file){
		var projectImageName = req.file.filename;
	}else{
		var projectImageName = 'noimage.jpg';
	}

	//validation
	req.checkBody('title', 'Title field is required.').notEmpty();
	req.checkBody('service', 'Service field is required').notEmpty();

	//check for the errors
	var errors = req.validationErrors();

	if(errors){
		//render admin/add and pass along those errors as well as the different variables so we can fill the form again
		res.render('admin/add', {
			errors: errors,
			title: title,
			description: description,
			service: service,
			client: client,
			url: url
		});
	}else{
		var cateportfolio = {
			title: title,
			description: description,
			service: service,
			client: client,
			date: projectdate,
			url: url,
			image: projectImageName
		};
	}

	//execute the query
	//cateportfolio is an object in the "else"
	var query = connection.query('INSERT INTO cateportfolio set ?', cateportfolio, function(err, result){
		console.log('Error: ' +err);
		console.log('Success: '+result);
	});

	req.flash('success_msg', 'Project Added');

	res.redirect('/admin');
});

//Edit
router.get('/edit/:id', function(req, res, next){
	connection.query("SELECT * FROM cateportfolio WHERE id = ?", req.params.id, function(err, rows, fields){
		if(err) throw err;
		res.render('admin/edit', {
			"cateportfolio": rows[0]			
		});
	});
});

router.post('/edit/:id', upload.single('projectimage'), function(req, res){
	var title = req.body.title;
	var service = req.body.service;
	var client = req.body.client;
	var description = req.body.description;
	var url = req.body.url;
	var projectdate = req.body.projectdate;

	//check image upload
	//if the image is there, we're going to put the filename into projectImageName variable
	if(req.file){
		var projectImageName = req.file.filename;
	}else{
		var projectImageName = 'noimage.jpg';
	}

	//validation
	req.checkBody('title', 'Title field is required.').notEmpty();
	req.checkBody('service', 'Service field is required').notEmpty();

	//check for the errors
	var errors = req.validationErrors();

	if(req.file){
		if(errors){		
			res.render('admin/edit/:id', {
				errors: errors,
				title: title,
				description: description,
				service: service,
				client: client,
				url: url
			});
		}else{
			var cateportfolio = {
				title: title,
				description: description,
				service: service,
				client: client,
				date: projectdate,
				url: url,
				image: projectImageName
			};
		}
	} else {
		if(errors){		
			res.render('admin/edit/:id', {
				errors: errors,
				title: title,
				description: description,
				service: service,
				client: client,
				url: url
			});
		}else{
			var cateportfolio = {
				title: title,
				description: description,
				service: service,
				client: client,
				date: projectdate,
				url: url
			};
		}
	}

	//execute the query
	//cateportfolio is an object in the "else"
	var query = connection.query('UPDATE cateportfolio set ? WHERE id = ' +req.params.id, cateportfolio, function(err, result){
		console.log('Error: ' +err);
		console.log('Success: '+result);
	});

	req.flash('success_msg', 'Project updated successfully!');

	res.redirect('/admin');
});


router.delete('/delete/:id', function(req, res){
	connection.query('DELETE FROM cateportfolio WHERE id = '+req.params.id, function(err, result){
		if(err) throw err;
		console.log('Deleted' + result.affectedRows + 'rows');
	});
	req.flash('success_msg', 'Deleted successfully!');
	res.sendStatus(200);
});

module.exports = router;
