import {
	Controller,
	Get,
	NotImplementedException,
	Param,
} from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { SeedService } from "../services";

@Controller("seed")
export class SeedController {
	constructor(private readonly seedService: SeedService) {}

	@ApiExcludeEndpoint()
	@Get("/:token")
	async seedDB(@Param("token") token: string): Promise<void> {
		if (token === process.env.INTERRUPTER_TOKEN) {
			await this.seedService.seedDB();
		} else {
			console.log("wrong token");
		}
		throw new NotImplementedException();
	}
}
