import { Arrival } from "./arrival.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

export class Order {
	id: string;
	arrival?: Arrival;
	user?: User;
	products?: Product[];
}
