import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Item } from './item/item.model';
import { Cart } from './cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	endpoint = 'http://localhost:8080/api';

	constructor(private http: HttpClient) { }

	getItems(): Observable<Item[]> {
		return this.http.get<Item[]>(`${this.endpoint}/items`, {withCredentials: true});
	}

	addItem(id, quantity): Observable<void> {
		let body = {
			quantity: quantity
		};
		return this.http.post<void>(`${this.endpoint}/item/${id}`, body, {withCredentials: true});
	}

	getCart(): Observable<Cart> {
		return this.http.get<Cart>(`${this.endpoint}/shopping-cart`, {withCredentials: true});
	}

	getTotal = () => {
		return this.http.get(`${this.endpoint}/total`, {withCredentials: true});
	}

	clearCart() {
		return this.http.delete(`${this.endpoint}/shopping-cart`, {withCredentials: true});
	}
}
