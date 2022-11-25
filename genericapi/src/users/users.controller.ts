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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("User")
@Controller("user")
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
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Returns all users",
	})
	findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Returns one User by ID",
	})
	findOne(@Param("id") id: string): Promise<User> {
		return this.usersService.findOne(id);
	}

	@Patch(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
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
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({
		summary: "Delete one User by ID",
	})
	remove(@Param("id") id: string): Promise<User> {
		return this.usersService.remove(id);
	}
}
