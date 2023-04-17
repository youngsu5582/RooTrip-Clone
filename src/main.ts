import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import InitSwagger from "./config/swagger/swagger";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await InitSwagger(app);
  app.setGlobalPrefix("api");
  const service = app.get(ConfigService);
  const port = service.get("app.port");
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: true
    })
  );
  app.enableCors();
  await app
    .listen(port)
    .then(() => console.log("Server Open!"))
    .catch((err) => console.error(err));
}
bootstrap();
