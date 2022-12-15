import type { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const PORT = process.env.PORT || 3333;

export async function bootstrap(): Promise<void> {
	console.clear();
	console.log("Starting and validating");

	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors({
		allowedHeaders: "*",
		methods: "HEAD, GET, PATCH, POST, PUT, DELETE",
		origin: "*",
	});
	app.set("trust proxy", 1);

	app.useGlobalPipes(
		new ValidationPipe({
			forbidNonWhitelisted: true,
			whitelist: true,
			transform: true,
		}),
	);
	console.log("Server Started\n\nMapping documentation");

	const config = new DocumentBuilder()
		.setTitle("Generic API")
		.setDescription("Controller API for educational purpose")
		.setVersion("1.2.12")
		.setExternalDoc(`Local Documentation`, `http://localhost:${PORT}/api`)
		.addTag("Status")
		.addTag("Auth")
		.addTag("Home")
		.addBearerAuth()
		.addServer("https://generic-api-beta.vercel.app/", "Online official")
		.addServer("https://genericapi.up.railway.app/", "Online Backup")
		.addServer(`http://localhost:${PORT}`, "Local")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	console.log("Swagger.setup Builded");
	console.log("Mapping routes:");
	await app.listen(PORT, () => {
		console.log(`Locally app bootstraped at http://localhost:${PORT}`);
	});
}
bootstrap();
