import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import path from 'path';
const option = new DocumentBuilder()
  .setTitle('RooTrip Clone Coding')
  .setDescription('RooTrip 클론 코딩 서버입니다.')
  .setVersion('1.0')
  .build();

export default async function (app: INestApplication) {
  //const document = SwaggerModule.createDocument(app, option);
  const swaggerConfig = readFileSync(path.join(__dirname,'../../bin/swagger.json'),'utf-8');
  const swaggerDocument = JSON.parse(swaggerConfig);

  SwaggerModule.setup('api-docs', app, swaggerDocument);
}
