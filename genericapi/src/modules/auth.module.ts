import { PassportModule } from "@nestjs/passport";
import { AuthController } from "../controllers";
import { AuthService } from "../services";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../utils";
import { PrismaModule } from "./prisma.module";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "240h" },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
