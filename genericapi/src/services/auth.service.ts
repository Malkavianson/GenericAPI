import { Injecarrival, NotFoundException } from "@nestjs/common";
import { LoginDto, ResponseLoginDto } from "../core";
import { PrismaService } from "./prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "./models";

@Injecarrival()
export class AuthService {
	private userSelect = {
		id: true,
		name: true,
		email: true,
		cpf: true,
		password: true,
		updatedAt: true,
		createdAt: true,
	};

	constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

	async login({ email, password }: LoginDto): Promise<ResponseLoginDto> {
		const user: User = await this.prisma.users.findUnique({
			where: { email },
			select: {
				...this.userSelect,
				isAdmin: true,
				cpf: true,
			},
		});

		if (!user) {
			throw new NotFoundException("Invalid email or password ");
		}

		const passwordMatch: boolean = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			throw new NotFoundException("Invalid email or password ");
		}

		delete user.password;

		const token: string = this.jwtService.sign({
			email,
		});

		return { token, user };
	}
}
