import { Injectable, NotImplementedException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
	CreateArrivalDto,
	CreateCategoryDto,
	CreateProductDto,
	CreateUserDto,
} from "../core";
import { Category } from "./models";

@Injectable()
export class SeedService {
	constructor(private readonly prisma: PrismaService) {}
	private seedUsers = (quantity: number): CreateUserDto[] => {
		const data: CreateUserDto[] = [];
		for (let i = 0; i < quantity; i++) {
			data.push({
				name: `User_${i}`,
				email: `user${i}@mail.com`,
				password: `User${i}*1234`,
				cpf: `${i}0872246${(i: number): number => i - 9}50`,
				isAdmin: false,
			});
		}
		return data;
	};
	private seedCategories = (quantity: number): CreateCategoryDto[] => {
		const data: CreateCategoryDto[] = [];
		for (let i = 0; i < quantity; i++) {
			data.push({
				name: `Category_${i}`,
			});
		}
		return data;
	};
	private seedProducts = (
		quantity: number,
		categories: Category[],
	): CreateProductDto[] => {
		const data: CreateProductDto[] = [];
		for (let i = 0; i < quantity; i++) {
			const categoryId =
				categories[Math.floor(Math.random() * categories.length)].id;
			data.push({
				name: `Product ${i}`,
				description: `This is the Product ${i}, the best of the best ${i}º product in the world `,
				price: i + 0.99,
				image: "https://numerologyinsightsblog.files.wordpress.com/2020/08/neutral-and-enemy-number-of-numerology.jpeg",
				categoryId,
			});
		}
		return data;
	};

	private seedArrival = (users: number): CreateArrivalDto[] => {
		const data: CreateArrivalDto[] = [];
		const homies = Math.round(users / 3 + Math.random() * (users / 2));
		for (let i = 0; i < homies; i++) {
			data.push({
				number: Number(i),
			});
		}
		return data;
	};

	async seedDB(): Promise<void> {
		let data;

		data = this.seedUsers(9);
		await this.prisma.users.createMany({
			data,
			skipDuplicates: true,
		});

		const users = await this.prisma.users.count();
		data = this.seedArrival(users);
		await this.prisma.arrival.createMany({
			data,
			skipDuplicates: true,
		});

		data = this.seedCategories(5);
		await this.prisma.category.createMany({
			data,
			skipDuplicates: true,
		});

		const categories = await this.prisma.category.findMany();
		data = this.seedProducts(50, categories);
		await this.prisma.product.createMany({
			data,
			skipDuplicates: true,
		});

		throw new NotImplementedException();
	}
}
