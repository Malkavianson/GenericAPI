import { Injectable } from "@nestjs/common";
import { handleErrorConstraintUnique } from "../utils";
import { Home, User } from "./models";
import { PrismaService } from "./prisma.service";

@Injectable()
export class HomeService {
	constructor(private readonly prisma: PrismaService) {}

	async userData(user: User): Promise<Home> {
		const res: Home = { user };
		const userId = user.id;
		res.favorites = await this.prisma.favorite
			.findMany({
				where: {
					userId,
				},
			})
			.catch(handleErrorConstraintUnique);
		res.arrival = await this.prisma.order
			.findMany({
				where: {
					userId,
					AND: {
						arrival: {
							isNot: null,
						},
					},
				},
				select: {
					arrival: true,
				},
			})
			.catch(handleErrorConstraintUnique);
		res.orders = await this.prisma.order
			.findMany({
				where: {
					userId,
				},
			})
			.catch(handleErrorConstraintUnique);
		return res;
	}
}
