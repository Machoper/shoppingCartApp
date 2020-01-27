const dataItems = require('../data/items');

function ShoppingCart(sessionCart) {
	this.items = sessionCart.items || {};
	this.total = sessionCart.total || 0;

	this.addItem = function(item, quantity) {
		var curItem = this.items[item.id]
		if (!curItem) {
			curItem = {
				name: item.description,
				quantity: 0,
				itemTotal: 0
			};
		}
		curItem.quantity += quantity;
		this.total -= curItem.itemTotal;
		curItem.itemTotal = getItemTotal(item, curItem.quantity);
		this.total += curItem.itemTotal;
		this.items[item.id] = curItem;
	};

	this.getTotal = function() {
		var total = 0;
		const keys = Object.keys(this.items);
		for (const key of keys) {
			var target = dataItems.filter(function(item) {
				return item.id === key;
			})[0];
			total += getItemTotal(target, this.items[key].quantity);
		}
		return total;
	}

	function getItemTotal(item, quantity) {
		if (item.volume_discounts.length > 0) {
			var discount = item.volume_discounts[0];
			var groupTotal = Math.floor(quantity / discount.number) * discount.price;
			var remainderTotal = (quantity % discount.number) * item.unit_price;
			return groupTotal + remainderTotal;
		}
		return parseFloat((quantity * item.unit_price).toFixed(2));
	}
}

module.exports = ShoppingCart;