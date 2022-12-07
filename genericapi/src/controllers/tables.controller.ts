import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateTableDto, UpdateTableDto } from "../core";
import { TablesService, Table } from "../services";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard())
@ApiTags("Tables")
@ApiBearerAuth()
@Controller("tables")
export class TablesController {
	constructor(private readonly tablesService: TablesService) {}

	@Post()
	@ApiOperation({
		summary: "Fill a new table state",
	})
	create(@Body() dto: CreateTableDto): Promise<Table | void> {
		return this.tablesService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: "List all Tables",
	})
	findAll(): Promise<Table[]> {
		return this.tablesService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "Find one Table by ID",
	})
	findOne(@Param("id") id: string): Promise<Table> {
		return this.tablesService.findOne(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Patch Table state information",
	})
	update(@Param("id") id: string, @Body() dto: UpdateTableDto): Promise<Table | void> {
		return this.tablesService.update(id, dto);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Release one Table state by ID",
	})
	remove(@Param("id") id: string) {
		return this.tablesService.remove(id);
	}
}
