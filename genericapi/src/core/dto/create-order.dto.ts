import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsUUID, ValidateNested } from "class-validator";
import { CreateOrderToProductDto } from "./create-order-to-product.dto";

export class CreateOrderDto {
	@IsNumber()
	@IsPositive()
	@ApiProperty({
		description: "Costumer number table",
		example: 10,
	})
	tableNumber: number;

	@IsUUID()
	@ApiProperty({
		description: "Costumer ID",
		example: "12345abc-ab1d-12a3-1ab2-12a3b456c789",
	})
	userId: string;

	@ValidateNested({ each: true })
	@Type(() => CreateOrderToProductDto)
	@ApiProperty({
		description: `List products and quantity on this order`,
		type: [CreateOrderToProductDto],
	})
	products: CreateOrderToProductDto[];
}
