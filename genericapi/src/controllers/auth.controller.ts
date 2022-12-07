import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseLoginDto, LoginDto } from "../core";
import { AuthService, User } from "../services";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "../decorators";
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
