import { Module } from "@nestjs/common";
import { AppController } from "./controllers";
import { AppService } from "./services";
import { AuthModule, UsersModule, CategoriesModule, OrdersModule, ProductsModule, TablesModule } from "./modules";

@Module({
	imports: [AuthModule, UsersModule, TablesModule, ProductsModule, CategoriesModule, OrdersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
