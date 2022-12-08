import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus,
	UseGuards,
	UnauthorizedException,
	ImATeapotException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoggedUser } from "../decorators";
import { CreateUserDto, UpdateUserDto } from "../core";
import { AuthGuard } from "@nestjs/passport";
import { User, UsersService } from "../services";

@ApiTags("User")
@Controller("user")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({
		summary: "Create a new User",
	})
	async create(@Body() dto: CreateUserDto): Promise<User | void> {
		return await this.usersService.create(dto);
	}

	@Get()
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Returns all users",
	})
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll();
	}

	@Get(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Returns one User by ID",
	})
	async findOne(@Param("id") id: string): Promise<User> {
		return await this.usersService.findOne(id);
	}

	@Patch(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Patch one User by ID",
	})
	async update(
		@LoggedUser() user: User,
		@Param("id") id: string,
		@Body() dto: UpdateUserDto,
	): Promise<User | void | ImATeapotException> {
		return await this.usersService.update(id, dto, user);
	}

	@Delete(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({
		summary: "Delete one User by ID",
	})
	async remove(
		@LoggedUser() user: User,
		@Param("id") id: string,
	): Promise<User | UnauthorizedException> {
		return await this.usersService.remove(id, user);
	}
}
