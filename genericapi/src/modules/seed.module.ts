import { SeedController } from "../controllers";
import { PrismaModule } from "./prisma.module";
import { SeedService } from "../services";
import { Module } from "@nestjs/common";

@Module({
	imports: [PrismaModule],
	controllers: [SeedController],
	providers: [SeedService],
})
export class SeedModule {}
