import handleErrorConstraintUnique from "../utils/handleErrorConstraintUnique.utils";
import {
	ImATeapotException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "./prisma.service";
import { User } from "../models/user.entity";

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

	async findAll(): Promise<User[]> {
		return await this.prisma.users.findMany({
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

	async findOne(id: string): Promise<User> {
		return await this.verifyIdAndReturnUser(id);
	}

	private async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
		return await this.prisma.users
			.update({
				where: { id },
				data: dto,
				select: this.userSelect,
			})
			.catch(handleErrorConstraintUnique);
	}

	async update(
		id: string,
		dto: UpdateUserDto,
		user: User,
	): Promise<ImATeapotException | User> {
		const thisUser = await this.verifyIdAndReturnUser(id);

		if (dto.password) {
			const hashedPassword = await bcrypt.hash(dto.password, 7);
			dto.password = hashedPassword;
		}
		if (user.isAdmin) {
			if (thisUser.id === user.id) {
				this.updateUser(id, dto);
				throw new ImATeapotException({
					message: "I'm a teapot < you must to reload your session >",
				});
			} else {
				return await this.prisma.users
					.update({
						where: { id },
						data: dto,
						select: this.userSelect,
					})
					.catch(handleErrorConstraintUnique);
			}
		} else if (thisUser.id === user.id) {
			let message: string;
			if (dto.isAdmin === true) {
				dto.isAdmin = false;
				message: "I'm a teapot < you cannot modify your credential levels & you must to reload your session >";
			} else {
				message: "I'm a teapot < you must to reload your session >";
			}
			await this.updateUser(id, dto).catch(handleErrorConstraintUnique);
			throw new ImATeapotException({
				message,
			});
		} else {
			throw new UnauthorizedException("not authorized");
		}
	}

	async remove(
		id: string,
		user: User,
	): Promise<User | UnauthorizedException> {
		const thisUser = await this.verifyIdAndReturnUser(id);
		if (user.isAdmin) {
			return await this.prisma.users.delete({
				where: { id },
				select: this.userSelect,
			});
		}
		if (thisUser.id === user.id) {
			return await this.prisma.users.delete({
				where: { id },
				select: this.userSelect,
			});
		} else {
			return new UnauthorizedException("not authorized");
		}
	}
}
