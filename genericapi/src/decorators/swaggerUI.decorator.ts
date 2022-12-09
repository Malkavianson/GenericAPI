import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const BringSwaggerUI = createParamDecorator(
	(_, ctx: ExecutionContext) => {
		const test = ctx.getType();
		console.log(test);
	},
);
