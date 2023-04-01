import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import InitSwagger from './loaders/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await InitSwagger(app);
  await app.listen(8000);
  console.log('Server Open!');
}
bootstrap();
