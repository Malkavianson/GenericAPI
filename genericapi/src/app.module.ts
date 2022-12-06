import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth.module";
import { UsersModule } from "./modules/users.module";

@Module({
	imports: [UsersModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
