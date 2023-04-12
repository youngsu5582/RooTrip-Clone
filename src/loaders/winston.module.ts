import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        level: configService.get('app.logLevel', 'info'),
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        transports: [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
          }),
          new winston.transports.File({
            filename: 'logs/combined.log',
          }),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
