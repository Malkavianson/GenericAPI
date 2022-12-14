import { Module } from "@nestjs/common";
import { AppController } from "./controllers";
import { AppService } from "./services";
import {
	AuthModule,
	UsersModule,
	CategoriesModule,
	OrdersModule,
	ProductsModule,
	ArrivalsModule,
	SeedModule,
	HomeModule,
} from "./modules";

@Module({
	imports: [
		AuthModule,
		UsersModule,
		ArrivalsModule,
		ProductsModule,
		CategoriesModule,
		OrdersModule,
		SeedModule,
		HomeModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
