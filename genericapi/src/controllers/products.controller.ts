import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
} from "@nestjs/common";
import {
	CreateProductDto,
	FavoriteProductDto,
	UpdateProductDto,
} from "../core";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Favorite, ProductsService, Product, User } from "../services";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "../decorators";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Register a new Product",
	})
	@ApiBearerAuth()
	async create(
		@Body() dto: CreateProductDto,
		@LoggedUser() user: User,
	): Promise<Product | void> {
		return await this.productsService.create(dto, user);
	}

	@Post("fav")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "User new favorite product",
	})
	@ApiBearerAuth()
	async favorite(
		@Body() dto: FavoriteProductDto,
		@LoggedUser() user: User,
	): Promise<Favorite> {
		return await this.productsService.favorite(dto, user);
	}

	@Get()
	@ApiOperation({
		summary: "List all products",
	})
	async findAll(@Query() query: Partial<Product>): Promise<Product[]> {
		return await this.productsService.findAll(query);
	}

	@Get(":id")
	@ApiOperation({
		summary: "Search one Product by ID",
	})
	async findOne(@Param("id") id: string): Promise<Product> {
		return await this.productsService.findOne(id);
	}

	@Get(":id/fav")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "List all users that favorited one Product by ID",
	})
	@ApiBearerAuth()
	async findAllFavUsersById(
		@Param("id") id: string,
		@LoggedUser() user: User,
	): Promise<Favorite[]> {
		return await this.productsService.findAllFavUsersById(id, user);
	}

	@Patch(":id")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Patch one Product data information by ID",
	})
	@ApiBearerAuth()
	async update(
		@LoggedUser() user: User,
		@Param("id") id: string,
		@Body() dto: UpdateProductDto,
	): Promise<Product | void> {
		return await this.productsService.update(id, dto, user);
	}

	@Delete(":id")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Delete one Product by ID",
	})
	@ApiBearerAuth()
	async remove(
		@Param("id") id: string,
		@LoggedUser() user: User,
	): Promise<Product> {
		return await this.productsService.remove(id, user);
	}

	@Delete("fav/:id")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Delete one Product favorited for one User by ID",
	})
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	async disFav(
		@Param("id") id: string,
		@LoggedUser() user: User,
	): Promise<Favorite> {
		return await this.productsService.disFav(id, user);
	}

	@Delete("favAll/:id")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Delete all users that favorited one Product by ID",
	})
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	async disfavAll(
		@Param("id") id: string,
		@LoggedUser() user: User,
	): Promise<string> {
		return await this.productsService.disFavAll(id, user);
	}
}
