import type { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const PORT = process.env.PORT || 3333;

export async function bootstrap(): Promise<void> {
	console.clear();
	console.log("Starting and validating");

	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: {
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
			optionsSuccessStatus: 204,
			origin: "*",
		},
	});
	app.set("trust proxy", 1);

	app.useGlobalPipes(new ValidationPipe());

	console.log("Server Started\n\nMapping documentation");

	const config = new DocumentBuilder()
		.setTitle("Generic API")
		.setDescription("Controller API for educational purpose")
		.setVersion("1.0")
		.addTag("Status")
		.addTag("Auth")
		.addBearerAuth()
		.addServer("https://generic-api-beta.vercel.app/", "Online")
		.addServer("http://localhost:3333", "Local")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	console.log("Swagger.setup Builded");
	console.log("Mapping routes:");
	await app.listen(PORT, () => {
		console.log(`App bootstraped at :${PORT}`);
	});
}
bootstrap();
