import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { CreateProductDto, FavoriteProductDto, UpdateProductDto } from "../core";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Favorite, ProductsService, Product } from "../services";
import { AuthGuard } from "@nestjs/passport";

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
	async create(@Body() dto: CreateProductDto): Promise<Product | void> {
		return await this.productsService.create(dto);
	}

	@Post("fav")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "User new favorite product",
	})
	@ApiBearerAuth()
	async favorite(@Body() dto: FavoriteProductDto): Promise<Favorite> {
		return await this.productsService.favorite(dto);
	}

	@Get()
	@ApiOperation({
		summary: "List all products",
	})
	findAll(@Query() query: Partial<Product>): Promise<Product[]> {
		return this.productsService.findAll(query);
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
	async findAllFavUsersById(@Param("id") id: string): Promise<Favorite[]> {
		return await this.productsService.findAllFavUsersById(id);
	}

	@Patch(":id")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Patch one Product data information by ID",
	})
	@ApiBearerAuth()
	async update(@Param("id") id: string, @Body() dto: UpdateProductDto): Promise<Product | void> {
		return await this.productsService.update(id, dto);
	}

	@Delete(":id")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Delete one Product by ID",
	})
	@ApiBearerAuth()
	async remove(@Param("id") id: string): Promise<Product> {
		return await this.productsService.remove(id);
	}

	@Delete("fav/:id")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Delete one Product favorited for one User by ID",
	})
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	async disFav(@Param("id") id: string): Promise<Favorite> {
		return await this.productsService.disFav(id);
	}

	@Delete("favAll/:id")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Delete all users that favorited one Product by ID",
	})
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	async disfavAll(@Param("id") id: string): Promise<string> {
		return await this.productsService.disFavAll(id);
	}
}
