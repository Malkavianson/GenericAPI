import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../models/user.entity";
import { PrismaService } from "../services/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: { email: string }): Promise<User> {
		const user: User = await this.prisma.users
			.findUnique({
				where: { email: payload.email },
			})
			.then(res => {
				if (res) {
					return res;
				} else {
					throw new UnauthorizedException("Deny");
				}
			});

		if (!user) {
			throw new UnauthorizedException("Deny");
		}

		delete user.password;

		return user;
	}
}
