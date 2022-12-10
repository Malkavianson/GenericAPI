import {
	Controller,
	Get,
	NotImplementedException,
	Param,
	Res,
} from "@nestjs/common";
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AppService } from "../services";

@ApiTags("Status")
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiExcludeEndpoint()
	@Get()
	getAppHome(@Res() res: Response): void {
		res.redirect("/api");
	}

	@ApiExcludeEndpoint()
	@Get("docs")
	getAppSwaggerEditor(@Res() res: Response): void {
		res.redirect(
			"https://editor.swagger.io/?url=https://generic-api-beta.vercel.app/api-yaml",
		);
	}

	@ApiExcludeEndpoint()
	@Get("stop/:token")
	getAppStop(@Param("token") token: string): void {
		if (token === process.env.INTERRUPTER_TOKEN) {
			console.log("Server paralyzed");
			process.kill(0, "SIGINT");
		} else {
			console.log("wrong token");
		}
		throw new NotImplementedException();
	}

	@Get("status")
	getAppStatus(): string {
		return this.appService.getAppStatus();
	}
}
