import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseLoginDto } from "../services/dto/responseLogin.dto";
import { LoggedUser } from "../decorators/loggeduser.decorator";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../services/dto/login.dto";
import { User } from "../models/user.entity";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: "Login",
		description: "Response.token must be used to allow access",
	})
	async login(@Body() loginDto: LoginDto): Promise<ResponseLoginDto> {
		return await this.authService.login(loginDto);
	}

	@Get()
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Returns current user",
	})
	@ApiBearerAuth()
	profile(@LoggedUser() user: User): User {
		return user;
	}
}
