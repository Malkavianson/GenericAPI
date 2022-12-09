import { Controller, Get, Res } from "@nestjs/common";
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
		res.redirect("api");
	}
	@Get("status")
	getAppStatus(): string {
		return this.appService.getAppStatus();
	}
}
