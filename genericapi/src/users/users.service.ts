import handleErrorConstraintUnique from "src/utils/handleErrorConstraintUnique.utils";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
	private userSelect = {
		id: true,
		name: true,
		email: true,
		cpf: true,
		isAdmin: true,
		updatedAt: true,
		createdAt: true,
	};

	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateUserDto): Promise<User | void> {
		const hashedPassword = await bcrypt.hash(dto.password, 7);

		const data: CreateUserDto = {
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
			cpf: dto.cpf,
			isAdmin: false,
		};

		return this.prisma.users
			.create({ data, select: this.userSelect })
			.catch(handleErrorConstraintUnique);
	}

	findAll(): Promise<User[]> {
		return this.prisma.users.findMany({
			select: this.userSelect,
		});
	}

	async verifyIdAndReturnUser(id: string): Promise<User> {
		const user: User = await this.prisma.users.findUnique({
			where: { id },
			select: this.userSelect,
		});

		if (!user) {
			throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
		}

		return user;
	}

	findOne(id: string): Promise<User> {
		return this.verifyIdAndReturnUser(id);
	}

	async update(id: string, dto: UpdateUserDto): Promise<User | void> {
		await this.verifyIdAndReturnUser(id);

		if (dto.password) {
			const hashedPassword = await bcrypt.hash(dto.password, 7);
			dto.password = hashedPassword;
		}

		return this.prisma.users
			.update({ where: { id }, data: dto, select: this.userSelect })
			.catch(handleErrorConstraintUnique);
	}

	async remove(id: string): Promise<User> {
		await this.verifyIdAndReturnUser(id);

		return this.prisma.users.delete({
			where: { id },
			select: this.userSelect,
		});
	}
}
