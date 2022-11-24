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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";

@ApiTags("Users")
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({
		summary: "Create a new User",
	})
	create(@Body() dto: CreateUserDto): Promise<User | void> {
		return this.usersService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: "Returns all users",
	})
	findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "Returns one User by ID",
	})
	findOne(@Param("id") id: string): Promise<User> {
		return this.usersService.findOne(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Patch one User by ID",
	})
	update(
		@Param("id") id: string,
		@Body() dto: UpdateUserDto,
	): Promise<User | void> {
		return this.usersService.update(id, dto);
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({
		summary: "Delete one User by ID",
	})
	remove(@Param("id") id: string): Promise<User> {
		return this.usersService.remove(id);
	}
}
