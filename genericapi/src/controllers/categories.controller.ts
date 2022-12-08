import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto, UpdateCategoryDto } from "../core";
import { CategoriesService, Category } from "../services";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard())
@ApiTags("Categories")
@ApiBearerAuth()
@Controller("categories")
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	@ApiOperation({
		summary: "Product Category creator",
	})
	async create(@Body() dto: CreateCategoryDto): Promise<Category> {
		return await this.categoriesService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: "List all Products Categories",
	})
	async findAll(): Promise<Category[]> {
		return await this.categoriesService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "List one Product Category by ID",
	})
	async findOne(@Param("id") id: string): Promise<Category> {
		return await this.categoriesService.findOne(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Patch one Product Category by ID",
	})
	async update(@Param("id") id: string, @Body() dto: UpdateCategoryDto): Promise<Category> {
		return await this.categoriesService.update(id, dto);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Delete one Product Category by ID",
	})
	async remove(@Param("id") id: string): Promise<Category> {
		return await this.categoriesService.remove(id);
	}
}
