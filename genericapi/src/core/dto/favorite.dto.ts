import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class FavoriteProductDto {
	@IsUUID()
	@ApiProperty({
		description: "User ID that is favoriting a product",
		example: "12345abc-ab1d-12a3-1ab2-12a3b456c789",
	})
	userId: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Procuct favorited",
		example: "Temaki Hot Philadelphia",
	})
	productName: string;
}
