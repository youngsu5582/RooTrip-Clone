import { INestApplication } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
const option = new DocumentBuilder().setTitle('RooTrip Clone Coding').setDescription('RooTrip 클론 코딩 서버입니다.').setVersion('1.0').build();

export default async function(app:INestApplication){
    const document = SwaggerModule.createDocument(app,option);
    SwaggerModule.setup('api-docs',app,document);

}
