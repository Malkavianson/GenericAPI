import { Module } from "@nestjs/common";
import { AppController } from "./controllers";
import { AppService } from "./services";
import { AuthModule, UsersModule } from "./modules";

@Module({
	imports: [UsersModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
