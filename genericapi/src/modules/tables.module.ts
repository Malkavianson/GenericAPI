import { ArrivalsController } from "../controllers";
import { PassportModule } from "@nestjs/passport";
import { ArrivalsService } from "../services";
import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";

@Module({
	imports: [PrismaModule, PassportModule.register({ defaultStrategy: "jwt" })],
	controllers: [ArrivalsController],
	providers: [ArrivalsService],
})
export class ArrivalsModule {}
