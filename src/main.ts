import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import InitSwagger from './loaders/swagger';
import env from './loaders/env';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await InitSwagger(app);
  await app.listen(env.app.port)
  .then(()=>console.log('Server Open!'))
  .catch((err)=>console.error(err));
  
}
bootstrap();
