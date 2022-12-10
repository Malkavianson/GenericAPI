import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsUUID } from "class-validator";

export class CreateOrderToProductDto {
	@IsUUID()
	@ApiProperty({
		description: "Ordered productId",
		example: "54335abc-ab1d-12a3-1cx2-12a3b456c122",
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
