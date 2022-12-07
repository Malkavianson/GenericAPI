import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsUUID } from "class-validator";

export class CreateOrderToProductDto {
	@IsUUID()
	@ApiProperty({
		description: "Ordered productId",
		example: "12345abc-ab1d-12a3-1ab2-12a3b456c789",
	})
	productId: string;

	@IsInt()
	@IsPositive()
	@ApiProperty({
		description: "Product quantity",
		example: 10,
	})
	quantity: number;
}
