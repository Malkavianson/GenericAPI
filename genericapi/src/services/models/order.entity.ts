import { Arrival } from "./arrival.entity";
import { OrderToProduct } from "./orderToProduct.entity";
import { User } from "./user.entity";

export class Order {
	id: string;
	arrival?: Arrival;
	user?: User;
	products?: OrderToProduct[];
}
