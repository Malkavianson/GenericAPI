import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Order, OrdersService } from "../services";
import { CreateOrderDto } from "../core";

@UseGuards(AuthGuard())
@ApiTags("Orders")
@ApiBearerAuth()
@Controller("orders")
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	@ApiOperation({
		summary: "Register a new Order",
	})
	async create(@Body() dto: CreateOrderDto): Promise<Order> {
		return await this.ordersService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: "List all Orders",
	})
	async findAll(): Promise<Order[]> {
		return await this.ordersService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "Search one Order by ID",
	})
	async findOne(@Param("id") id: string): Promise<Order> {
		return await this.ordersService.findOne(id);
	}
}
