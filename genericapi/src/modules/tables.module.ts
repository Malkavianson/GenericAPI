import { TablesController } from "../controllers";
import { PassportModule } from "@nestjs/passport";
import { TablesService } from "../services";
import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";

@Module({
	imports: [PrismaModule, PassportModule.register({ defaultStrategy: "jwt" })],
	controllers: [TablesController],
	providers: [TablesService],
})
export class TablesModule {}
