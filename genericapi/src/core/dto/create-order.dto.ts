import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsUUID, ValidateNested } from "class-validator";
import { CreateOrderToProductDto } from "./create-order-to-product.dto";

export class CreateOrderDto {
	@IsNumber()
	@IsPositive()
	@ApiProperty({
		description: "Costumer number arrival",
		example: 10,
	})
	arrivalNumber: number;

	@IsUUID()
	@ApiProperty({
		description: "Costumer ID",
		example: "12123bc-abca-1aa3-1ab2-12a3b456c319",
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
