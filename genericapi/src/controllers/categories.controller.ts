import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto, UpdateCategoryDto } from "../core";
import { CategoriesService, Category, User } from "../services";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "../decorators";

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
	async create(
		@Body() dto: CreateCategoryDto,
		@LoggedUser() user: User,
	): Promise<Category> {
		return await this.categoriesService.create(dto, user);
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
	async update(
		@Param("id") id: string,
		@Body() dto: UpdateCategoryDto,
		@LoggedUser() user: User,
	): Promise<Category> {
		return await this.categoriesService.update(id, dto, user);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Delete one Product Category by ID",
	})
	async remove(
		@Param("id") id: string,
		@LoggedUser() user: User,
	): Promise<Category> {
		return await this.categoriesService.remove(id, user);
	}
}
