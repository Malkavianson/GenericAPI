import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from "class-validator";

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Name of Product",
		example: "my first Product",
	})
	name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Description of Product",
		example: "This is my first product",
	})
	description: string;

	@IsNumber({
		maxDecimalPlaces: 2,
	})
	@ApiProperty({
		description: "Price of Product",
		example: 1.99,
	})
	price: number;

	@IsUrl()
	@ApiProperty({
		description: "Link to product Image",
		example:
			"https://numerologyinsightsblog.files.wordpress.com/2020/08/neutral-and-enemy-number-of-numerology.jpeg",
	})
	image: string;

	@IsUUID()
	@IsNotEmpty()
	@ApiProperty({
		description: "Valid Product Category ID",
		example: "qw145abc-ab1d-12a3-1ab2-12a3b456c456",
	})
	categoryId: string;
}
