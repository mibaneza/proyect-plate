import { Type } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from "@nestjs/mongoose";

export default class MongoDBConfing{
    static getMongoDBConfig(configService: ConfigService): MongooseModuleOptions {
        return {
            uri: configService.get('URI_MONGO'),
        }
    }
}

export const mongoConfigAsync: MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ ConfigService],
    useFactory: async (configService: ConfigService): 
    Promise<MongooseModuleAsyncOptions> => MongoDBConfing.getMongoDBConfig(configService),
  

}