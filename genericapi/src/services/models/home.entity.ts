import { Arrival, Favorite, Order, User } from "./";

export class Home {
	user: User;
	favorites?: Favorite[];
	arrival?: { arrival: Arrival }[];
	orders?: Order[];
}
