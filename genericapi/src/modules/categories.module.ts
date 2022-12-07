import { CategoriesController } from "../controllers/categories.controller";
import { CategoriesService } from "../services/categories.service";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "./prisma.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [PrismaModule, PassportModule.register({ defaultStrategy: "jwt" })],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}
