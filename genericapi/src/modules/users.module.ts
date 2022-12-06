import { UsersController } from "../controllers/users.controller";
import { UsersService } from "../services/users.service";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "./prisma.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

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
