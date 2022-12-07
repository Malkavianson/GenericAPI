import { PrismaService } from "../services";
import { Module } from "@nestjs/common";

@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
