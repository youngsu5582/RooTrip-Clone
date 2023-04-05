import { Module } from '@nestjs/common';
import { TypeOrmProvider } from './typeorm/typeorm.module';

@Module({
    exports:[TypeOrmProvider],
})
export class DatabaseModule{};