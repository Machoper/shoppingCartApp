import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { Item } from './item.model';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

	private items: Item[];
	@Output() itemAdded: EventEmitter<any> = new EventEmitter();

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.apiService.getItems().subscribe(items => {
			this.items = items
			this.items.forEach(item => item.quantity = 1);
		});
	}

	plusOne(item): void {
		item.quantity += 1;
	}

	minusOne(item): void {
		item.quantity -= 1;
	}

	isMinusDisabled(item): boolean {
		return item.quantity <= 1;
	}

	addToCart(item): void {
		this.apiService.addItem(item.id, item.quantity).subscribe(res => {
			this.itemAdded.emit();
		});
	}

}
