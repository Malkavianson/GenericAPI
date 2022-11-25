import { PrismaModule } from "../prisma/prisma.module";
import { UsersController } from "./users.controller";
import { PassportModule } from "@nestjs/passport";
import { UsersService } from "./users.service";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "240h" },
		}),
	],
})
export class UsersModule {}
