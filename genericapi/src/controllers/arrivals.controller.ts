import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateArrivalDto, UpdateArrivalDto } from "../core";
import { ArrivalsService, Arrival } from "../services";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard())
@ApiTags("Arrivals")
@ApiBearerAuth()
@Controller("arrivals")
export class ArrivalsController {
	constructor(private readonly arrivalsService: ArrivalsService) {}

	@Post()
	@ApiOperation({
		summary: "Fill a new arrival state",
	})
	async create(@Body() dto: CreateArrivalDto): Promise<Arrival | void> {
		return await this.arrivalsService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: "List all Arrivals",
	})
	async findAll(): Promise<Arrival[]> {
		return await this.arrivalsService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "Find one Arrival by ID",
	})
	async findOne(@Param("id") id: string): Promise<Arrival> {
		return await this.arrivalsService.findOne(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Patch Arrival state information",
	})
	async update(@Param("id") id: string, @Body() dto: UpdateArrivalDto): Promise<Arrival | void> {
		return await this.arrivalsService.update(id, dto);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Release one Arrival state by ID",
	})
	async remove(@Param("id") id: string): Promise<Arrival> {
		return await this.arrivalsService.remove(id);
	}
}
