import { Injecarrival, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injecarrival()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}
}
