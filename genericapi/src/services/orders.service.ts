import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "../core";
import { Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class OrdersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateOrderDto) {
		const data: Prisma.OrderCreateInput = {
			arrival: {
				connect: {
					number: dto.arrivalNumber,
				},
			},
			user: {
				connect: {
					id: dto.userId,
				},
			},
			products: {
				createMany: {
					data: dto.products.map(e => ({
						productId: e.productId,
						quantity: e.quantity,
					})),
				},
			},
		};

		return this.prisma.order.create({
			data,
			select: {
				id: true,
				arrival: true,
				user: {
					select: {
						id: true,
						name: true,
					},
				},
				products: {
					select: {
						id: true,
						quantity: true,
						product: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		});
	}

	findAll() {
		return this.prisma.order.findMany({
			select: {
				id: true,
				arrival: {
					select: {
						number: true,
					},
				},
				user: {
					select: {
						name: true,
					},
				},
				products: {
					select: {
						quantity: true,
						product: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});
	}

	findOne(id: string) {
		return this.prisma.order.findUnique({
			where: { id },
			select: {
				id: true,
				arrival: {
					select: {
						number: true,
					},
				},
				user: {
					select: {
						name: true,
					},
				},
				products: {
					select: {
						quantity: true,
						product: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});
	}
}
