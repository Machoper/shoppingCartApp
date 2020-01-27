export class CartItem {
	name: string;
	quantity: number;
	itemTotal: number;
}

export class Cart {
	items: Map<string, CartItem>;
	total: number;
}