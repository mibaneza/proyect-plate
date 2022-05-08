import { Type } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from "@nestjs/mongoose";

export default class MongoDBConfing{
    static getMongoDBConfig(configService: ConfigService): MongooseModuleOptions {
        const protocol = configService.get('PROTOCOLO_MONGO');
        const user = configService.get('USER_MONGO');
        const password = configService.get('PASSWORD_MONGO');
        const url = configService.get('URL_MONGO');
        const db = configService.get('DB_MONGO');
        const config = configService.get('CONFIG_MONGO');

        return {
            uri: `${protocol}${user}:${password}@${url}/${db}${config}`
        }
    }
}

export const mongoConfigAsync: MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ ConfigService],
    useFactory: async (configService: ConfigService): 
    Promise<MongooseModuleAsyncOptions> => MongoDBConfing.getMongoDBConfig(configService),
  

}