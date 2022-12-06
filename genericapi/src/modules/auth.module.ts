import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { JwtStrategy } from "../utils/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "./prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

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
