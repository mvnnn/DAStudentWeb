var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt-nodejs');
// var pg = require('pg');
var jwt = require('jsonwebtoken');

var config = require('./_modules/config');
var handleErr = require('./_modules/error_handler');

var database_link = process.env.DATABASE_URL || config.database;

router.route('/login')
	.post(function(req, res) {

		var username = req.body.username;
		var password = req.body.password;
		var org_id = null;
		var token;
		pg.connect(database_link, function(err, client, done) {

			if (handleErr.db_error(err, client, done, req, res)) return;

			var query_string = 'SELECT id FROM organizations where username = $1 and password = $2;';

			client.query(query_string, [username, password], function(err, result) {

				if (handleErr.db_error(err, client, done, req, res)) return;
				org_id = result["rows"];
				console.log(org_id);
				fun(username, password, org_id);
				done();
			});
		});

		function fun(username, password, org_id) {
			// Authentication for cretif admin
			if (username == 'admin123' &&
				password == 'admin@15cretif') {
				console.log("if", org_id);
				token = jwt.sign(password, config.secret, {
					expiresIn: 72000 // expires in 20 hours
				});

				return res.status(200).json({
					data: {
						token: token
					}
				});
			} // Authentication for Normal User/Other than Admin
			else if (username || password) {
				console.log("else if", org_id);

				if (org_id.length != 0) {
					token = jwt.sign(org_id[0].id, config.secret, {
						expiresIn: 72000 // expires in 20 hours
					});

					return res.status(200).json({
						data: {
							token: token
						}
					});
				}else{
					return res.status(200).json({
						error: 'wrong username & password combination'
					});
				}


			} else {

				//Authentication for non-admin users
				console.log("else", org_id);

				if (!req.body.user_device_id) {
					return res.status(422).json({
						error: 'user_device_id not found'
					});
				}

				pg.connect(database_link, function(err, client, done) {

					if (handleErr.db_error(err, client, done, req, res)) return;

					var query_string = 'SELECT id FROM users\
										WHERE device_id = $1\
										ORDER BY "updatedAt" DESC LIMIT 1;';

					client.query(query_string, [req.body.user_device_id], function(err, result) {

						if (handleErr.db_error(err, client, done, req, res)) return;

						var users = result["rows"];

						done();

						if (users.length == 1) {
							var token = jwt.sign(users[0].id, config.secret, {
								expiresIn: 72000 // expires in 20 hours
							});

							return res.status(200).json({
								data: {
									token: token
								}
							});
						} else {
							return res.status(403).json({
								error: 'Invalid user_device_id'
							});
						}
					});
				});
			}
		};
	});

router.route('/auth')
	.post(function(req, res) {
		if (req.body.token) {
			jwt.verify(req.body.token, config.secret, function(err, decoded) {
				if (err) {
					return res.status(401).json({
						error: 'Failed to authenticate token.'
					});
				} else {
					return res.status(200).json({
						data: 'Token authenticated.'
					});
				}
			});
		} else {
			return res.status(403).json({
				error: 'token Not found'
			});
		}
	});

module.exports = router;
