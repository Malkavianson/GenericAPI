import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateTableDto {
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	@ApiProperty({
		description: "Table Number",
		example: 1,
	})
	number: number;
}
