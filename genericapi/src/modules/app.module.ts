import {
	AuthModule,
	UsersModule,
	ProductsModule,
	ArrivalsModule,
	CategoriesModule,
	OrdersModule,
} from "./";
import { AppController } from "../controllers";
import { AppService } from "../services";
import { Module } from "@nestjs/common";

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		UsersModule,
		ProductsModule,
		ArrivalsModule,
		CategoriesModule,
		OrdersModule,
		AuthModule,
	],
})
export class AppModule {}
