import { PassportModule } from "@nestjs/passport";
import { OrdersController } from "../controllers";
import { OrdersService } from "../services";
import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";

@Module({
	imports: [PrismaModule, PassportModule.register({ defaultStrategy: "jwt" })],
	controllers: [OrdersController],
	providers: [OrdersService],
})
export class OrdersModule {}
