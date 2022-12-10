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
} from "./modules";
import { SeedModule } from "./modules/seed.module";

@Module({
	imports: [
		AuthModule,
		UsersModule,
		ArrivalsModule,
		ProductsModule,
		CategoriesModule,
		OrdersModule,
		SeedModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
