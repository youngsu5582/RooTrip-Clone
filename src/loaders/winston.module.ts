import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        transports: [
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: winston.format.combine(winston.format.json()),
          }),
          new winston.transports.File({
            filename: "logs/combined.log",
            level: "info",
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json()
            ),
          }),
        ],
      }),
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
