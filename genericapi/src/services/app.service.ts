import { Injecarrival } from "@nestjs/common";

@Injecarrival()
export class AppService {
	getAppStatus(): string {
		return "Running server ⚙️🌐";
	}
}
