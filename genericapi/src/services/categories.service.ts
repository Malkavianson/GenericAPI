import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "../core";
import { handleErrorConstraintUnique } from "../utils";
import { Category } from "./models";
import { PrismaService } from "./prisma.service";

@Injectable()
export class CategoriesService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnCategory(id: string): Promise<Category> {
		const category: Category = await this.prisma.category.findUnique({
			where: { id },
		});

		if (!category) {
			throw new NotFoundException(`Id: '${id}' not found`);
		}

		return category;
	}

	async create(dto: CreateCategoryDto): Promise<Category> {
		return this.prisma.category.create({ data: dto }).catch(handleErrorConstraintUnique);
	}

	findAll(): Promise<Category[]> {
		return this.prisma.category.findMany();
	}

	findOne(id: string): Promise<Category> {
		return this.verifyIdAndReturnCategory(id);
	}

	async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
		await this.verifyIdAndReturnCategory(id);

		return this.prisma.category.update({ where: { id }, data: dto }).catch(handleErrorConstraintUnique);
	}

	async remove(id: string) {
		await this.verifyIdAndReturnCategory(id);

		try {
			return await this.prisma.category.delete({
				where: { id },
				select: { name: true },
			});
		} catch (err) {
			throw new UnauthorizedException(`Category ID: '${id}' still filled`);
		}
	}
}
