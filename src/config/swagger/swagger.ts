import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { readFileSync } from "fs";
import path from "path";
export default async function (app: INestApplication) {
  const swaggerConfig = readFileSync(
    path.join(path.join(process.cwd(),"/bin/swagger.json")),
    "utf-8"
  );
  const swaggerDocument = JSON.parse(swaggerConfig);
  SwaggerModule.setup("/api-docs", app, swaggerDocument);
}
