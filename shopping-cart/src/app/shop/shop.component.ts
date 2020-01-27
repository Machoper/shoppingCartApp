import { Component, OnInit } from '@angular/core';
import { CartItem, Cart } from '../cart/cart.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

	cart: Cart;

	constructor(private apiService: ApiService) {
		this.cart = new Cart();
		this.cart.total = 0;
	}

	ngOnInit() {
		this.reloadCart();
	}

	onItemAdded($event) {
		this.reloadCart();
	}

	private reloadCart() {
		this.apiService.getCart().subscribe(res => this.cart = res);
	}

}
