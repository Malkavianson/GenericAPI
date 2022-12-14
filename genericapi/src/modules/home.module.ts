import { Module } from "@nestjs/common";
import { HomeService } from "../services/home.service";
import { HomeController } from "../controllers/home.controller";
import { PrismaModule } from ".";
import { PassportModule } from "@nestjs/passport";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [HomeController],
	providers: [HomeService],
})
export class HomeModule {}
