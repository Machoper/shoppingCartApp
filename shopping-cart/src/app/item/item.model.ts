interface Discount {
    number: number;
    price: number;
}

export class Item {
    id: string;
    description: string;
    unit_price: number;
    volume_discounts: Discount[];
    quantity?: number;
}