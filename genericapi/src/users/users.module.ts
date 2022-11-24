import { PrismaModule } from "../prisma/prisma.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Module } from "@nestjs/common";

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [PrismaModule],
})
export class UsersModule {}
