import { PassportModule } from "@nestjs/passport";
import { ProductsController } from "../controllers";
import { PrismaModule } from "./prisma.module";
import { ProductsService } from "../services";
import { Module } from "@nestjs/common";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
