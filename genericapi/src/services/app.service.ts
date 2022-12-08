import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getAppStatus(): string {
		return "Running server ⚙️🌐";
	}
}
