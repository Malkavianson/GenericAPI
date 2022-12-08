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
	imports: [
		UsersModule,
		ProductsModule,
		ArrivalsModule,
		CategoriesModule,
		OrdersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
