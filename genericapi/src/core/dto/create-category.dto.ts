import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Product category",
		example: "Product Category 1",
	})
	name: string;
}
