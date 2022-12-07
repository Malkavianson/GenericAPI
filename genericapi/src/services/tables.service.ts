import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTableDto, UpdateTableDto } from "../core";
import { handleErrorConstraintUnique } from "../utils";
import { PrismaService } from "./prisma.service";
import { Table } from "./models";

@Injectable()
export class TablesService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnTable(id: string): Promise<Table> {
		const table: Table = await this.prisma.table.findUnique({
			where: { id },
		});

		if (!table) {
			throw new NotFoundException(`Table id:'${id}' not found`);
		}

		return table;
	}

	async create(dto: CreateTableDto): Promise<Table | void> {
		return this.prisma.table.create({ data: dto }).catch(handleErrorConstraintUnique);
	}

	async findAll(): Promise<Table[]> {
		return this.prisma.table.findMany();
	}

	async findOne(id: string): Promise<Table> {
		return this.verifyIdAndReturnTable(id);
	}

	async update(id: string, dto: UpdateTableDto) {
		this.verifyIdAndReturnTable(id);

		return this.prisma.table.update({ where: { id }, data: dto }).catch(handleErrorConstraintUnique);
	}

	async remove(id: string) {
		await this.verifyIdAndReturnTable(id);

		return this.prisma.table.delete({
			where: { id },
		});
	}
}
