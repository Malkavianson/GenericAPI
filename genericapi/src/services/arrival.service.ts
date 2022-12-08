import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateArrivalDto, UpdateArrivalDto } from "../core";
import { handleErrorConstraintUnique } from "../utils";
import { PrismaService } from "./prisma.service";
import { Arrival } from "./models";

@Injectable()
export class ArrivalsService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnArrival(id: string): Promise<Arrival> {
		const arrival: Arrival = await this.prisma.arrival.findUnique({
			where: { id },
		});

		if (!arrival) {
			throw new NotFoundException(`Arrival id:'${id}' not found`);
		}

		return arrival;
	}

	async create(dto: CreateArrivalDto): Promise<Arrival | void> {
		return this.prisma.arrival.create({ data: dto }).catch(handleErrorConstraintUnique);
	}

	async findAll(): Promise<Arrival[]> {
		return this.prisma.arrival.findMany();
	}

	async findOne(id: string): Promise<Arrival> {
		return this.verifyIdAndReturnArrival(id);
	}

	async update(id: string, dto: UpdateArrivalDto): Promise<Arrival> {
		this.verifyIdAndReturnArrival(id);

		return this.prisma.arrival.update({ where: { id }, data: dto }).catch(handleErrorConstraintUnique);
	}

	async remove(id: string): Promise<Arrival> {
		await this.verifyIdAndReturnArrival(id);

		return this.prisma.arrival.delete({
			where: { id },
		});
	}
}
