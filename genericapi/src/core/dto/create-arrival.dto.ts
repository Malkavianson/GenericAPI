import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateArrivalDto {
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	@ApiProperty({
		description: "Arrival Number",
		example: 1,
	})
	number: number;
}
