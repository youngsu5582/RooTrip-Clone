import { Module } from "@nestjs/common";
import { TestController } from "src/controllers/test.controller";

@Module({
  controllers: [TestController]
})
export class TestModule {}
