import { DataSource } from "typeorm";
import env from '../../loaders/env';import { Module } from "@nestjs/common";
const tyeporm = env.database.typeorm;
const typeormModule = 
    {
        provide : 'DATA_SOURCE',
        useFactory : async ()=>{
            const dataSource = new DataSource({
                type : 'mysql',
                host: tyeporm.host,
                port: tyeporm.port,
                username: tyeporm.username,
                password: tyeporm.password,
                database: tyeporm.name,
                //logging: "all",
                synchronize:true,
                connectTimeout:20000,
                acquireTimeout:20000,
                entities: [__dirname+"/../entities/*{.ts,.js}"],
            });
            return dataSource.initialize();
        }
    }
@Module({
    exports:[typeormModule]
})
export class TypeOrmModule{}