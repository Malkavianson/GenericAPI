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
	create(@Body() dto: CreateCategoryDto): Promise<Category> {
		return this.categoriesService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: "List all Products Categories",
	})
	findAll(): Promise<Category[]> {
		return this.categoriesService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "List one Product Category by ID",
	})
	findOne(@Param("id") id: string): Promise<Category> {
		return this.categoriesService.findOne(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Patch one Product Category by ID",
	})
	update(@Param("id") id: string, @Body() dto: UpdateCategoryDto): Promise<Category> {
		return this.categoriesService.update(id, dto);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Delete one Product Category by ID",
	})
	remove(@Param("id") id: string): Promise<Category> {
		return this.categoriesService.remove(id);
	}
}
