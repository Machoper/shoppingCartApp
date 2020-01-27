import { Component, OnInit, Input } from '@angular/core';
import { CartItem, Cart } from './cart.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	@Input() cart: Cart;

	constructor(private apiService: ApiService) { }

	ngOnInit() {
	}

	clearCart() {
		this.apiService.clearCart().subscribe(() => {
			this.cart = new Cart();
			this.cart.total = 0;
		});
	}

}
