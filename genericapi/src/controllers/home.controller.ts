import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { Home, HomeService, User } from "../services";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "../decorators";

@ApiTags("Home")
@Controller("home")
export class HomeController {
	constructor(private readonly homeService: HomeService) {}

	@Get()
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Returns userdata",
	})
	async userData(@LoggedUser() user: User): Promise<Home> {
		return await this.homeService.userData(user);
	}
}
