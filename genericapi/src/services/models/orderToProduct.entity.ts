import { Product } from "./product.entity";
import { Order } from "./order.entity";

export class OrderToProduct {
	id?: string;
	quantity?: number;
	product?: Product;
	order?: Order;
}
