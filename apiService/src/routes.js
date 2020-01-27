const express = require('express');
const router = express.Router();
const ShoppingCart = require('./models/shoppingCart');
const items = require('./data/items');

router.get('/shopping-cart', function(req, res) {
	var cart = req.session.cart || new ShoppingCart({});
	res.status(200).json({ items: cart.items, total: cart.total });
});

router.put('/shopping-cart', function(req, res) {
	if (!req.session.cart) {
		req.session.cart = new ShoppingCart({});
		res.status(200).json('Started new shopping cart.');
	} else {
		res.status(400).json('Your shopping cart already exists.');
	}
});

router.delete('/shopping-cart', function(req, res) {
	if (req.session.cart) {
		req.session.cart.items = {};
		req.session.cart.total = 0;
	}
	res.status(200).json('Your shopping cart has been cleared.');
});

router.get('/items', function(req, res) {
	res.status(200).json(items);
});

router.post('/item/:id', function(req, res) {
	var sessionCart = req.session.cart || {};
	var cart = new ShoppingCart(sessionCart);
	var target = items.filter(function(item) {
		return item.id === req.params.id;
	});
	if (target.length === 0) {
		res.status(400).json({ message: 'Item does not exist!' });
	} else {
		var quantity = req.body.quantity || 1;
		var item = target[0];
		cart.addItem(item, quantity)
		req.session.cart = cart;
		res.status(200).json(`${quantity} ${item.description} has been added to the shopping cart.`);
	}
});

router.get('/total', function(req, res) {
	var total = 0
	if (req.session.cart) {
		if (req.session.cart.total) {
			total = req.session.cart.total;
		} else {
			var cart = new ShoppingCart(req.session.cart);
			total = cart.getTotal();
		}
	}
	res.status(200).json({ total: total });
});

module.exports = router;