const supertest = require('supertest');
const chai = require('chai');
const express = require('express');
const session = require('express-session');
const server = require('../src/server');


describe('test shopping cart total', function() {
	var mockServer;

	beforeEach(function() {
		mockServer = express();
		mockServer.use(session({
			secret: 'machoper',
			resave: false,
			saveUninitialized: true
		}));
	});

	it('ABCDABAA should yield a total of $32.40', function(done) {
		mockServer.all('*', function(req, res, next) {
			req.session.cart = {
				items: {
					A: {quantity: 4},
					B: {quantity: 2},
					C: {quantity: 1},
					D: {quantity: 1}
				}
			};
			next();
		});
		mockServer.use(server);
		supertest(mockServer).get('/api/total')
			.expect(200)
			.end(function(err, res) {
				chai.expect(res.body).to.eql({total: 32.40});
				done(err);
			});
	});

	it('CCCCCCC should yield a total of $7.25', function(done) {
		mockServer.all('*', function(req, res, next) {
			req.session.cart = {
				items: {					
					C: {quantity: 7}
				}
			};
			next();
		});
		mockServer.use(server);
		supertest(mockServer).get('/api/total')
			.expect(200)
			.end(function(err, res) {
				chai.expect(res.body).to.eql({total: 7.25});
				done(err);
			});
	});

	it('ABCD should yield a total of $15.40', function(done) {
		mockServer.all('*', function(req, res, next) {
			req.session.cart = {
				items: {
					A: {quantity: 1},
					B: {quantity: 1},
					C: {quantity: 1},
					D: {quantity: 1}
				}
			};
			next();
		});
		mockServer.use(server);
		supertest(mockServer).get('/api/total')
			.expect(200)
			.end(function(err, res) {
				chai.expect(res.body).to.eql({total: 15.40});
				done(err);
			});
	});
});