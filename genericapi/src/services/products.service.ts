import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
	UnprocessableEntityException,
} from "@nestjs/common";
import {
	CreateProductDto,
	FavoriteProductDto,
	UpdateProductDto,
} from "../core";
import { handleErrorConstraintUnique } from "../utils";
import { Favorite, Product, User } from "./models";
import { Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ProductsService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnProduct(id: string): Promise<Product> {
		const product: Product = await this.prisma.product.findUnique({
			where: { id },
		});

		if (!product) {
			throw new NotFoundException(`Id: '${id}' not found`);
		}

		return product;
	}

	async verifyIdAndReturnProductFav(id: string): Promise<Favorite> {
		const favoriteId: Favorite = await this.prisma.favorite.findUnique({
			where: { id },
		});

		if (!favoriteId) {
			throw new NotFoundException(`Favorite Id: '${id}' not found`);
		}

		return favoriteId;
	}

	async create(dto: CreateProductDto, user: User): Promise<Product | void> {
		if (!user.isAdmin) {
			throw new UnauthorizedException();
		}
		return await this.prisma.product
			.create({ data: dto })
			.catch(handleErrorConstraintUnique);
	}

	async favorite(dto: FavoriteProductDto, user: User): Promise<Favorite> {
		if (!user.isAdmin) {
			console.log(user);
		}
		const product: Product = await this.prisma.product.findUnique({
			where: { name: dto.productName },
		});

		if (!product) {
			throw new NotFoundException(`Product ${dto.productName} not found`);
		}

		const userUnique: User = await this.prisma.users.findUnique({
			where: { id: dto.userId },
		});

		if (!userUnique) {
			throw new NotFoundException(`ID User '${dto.userId}' not found`);
		}

		const data: Prisma.FavoriteCreateInput = {
			user: {
				connect: {
					id: dto.userId,
				},
			},
			product: {
				connect: {
					name: dto.productName,
				},
			},
		};

		return this.prisma.favorite.create({ data });
	}

	async findAll(query: Partial<Product>): Promise<Product[]> {
		const products: Product[] = await this.prisma.product
			.findMany({ where: query })
			.catch(() => {
				throw new UnprocessableEntityException("Invalid query format");
			});

		if (products.length === 0) {
			throw new NotFoundException("Search did not find any results");
		}

		return products;
	}

	async findOne(id: string): Promise<Product> {
		return await this.verifyIdAndReturnProduct(id);
	}

	async findAllFavUsersById(id: string, user: User): Promise<Favorite[]> {
		if (!user.isAdmin) {
			console.log(user);
		}
		const product: Product = await this.verifyIdAndReturnProduct(id);

		return await this.prisma.favorite.findMany({
			where: { productName: product.name },
			select: {
				productName: true,
				user: { select: { id: true, email: true } },
			},
		});
	}

	async update(
		id: string,
		dto: UpdateProductDto,
		user: User,
	): Promise<Product | void> {
		if (!user.isAdmin) {
			throw new UnauthorizedException();
		}
		await this.verifyIdAndReturnProduct(id);

		return await this.prisma.product
			.update({ where: { id }, data: dto })
			.catch(handleErrorConstraintUnique);
	}

	async remove(id: string, user: User): Promise<Product> {
		if (!user.isAdmin) {
			throw new UnauthorizedException();
		}
		await this.verifyIdAndReturnProduct(id);
		try {
			return await this.prisma.product.delete({ where: { id } });
		} catch (err) {
			throw new UnauthorizedException(
				`Product ID: '${id}' already favorited`,
			);
		}
	}

	async disFav(id: string, user: User): Promise<Favorite> {
		if (!user.isAdmin) {
			console.log(user);
		}
		await this.verifyIdAndReturnProductFav(id);

		return await this.prisma.favorite.delete({ where: { id } });
	}

	async disFavAll(id: string, user: User): Promise<string> {
		if (!user.isAdmin) {
			throw new UnauthorizedException();
		}
		const allUsers = await this.findAllFavUsersById(id, user);

		allUsers.forEach(async e => {
			const exFav = await this.prisma.favorite.findMany({
				where: { userId: e.userId, productName: e.productName },
			});

			exFav.forEach(async e => {
				const favoriteId: Favorite =
					await this.prisma.favorite.findUnique({
						where: { id: e.id },
					});

				if (favoriteId) {
					await this.prisma.favorite.delete({ where: { id: e.id } });
				}
			});
		});
		return `Product id ${id} is no longer favorited!`;
	}
}
