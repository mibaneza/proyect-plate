import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoConfigAsync } from './config/mongo.config';
import { InfoPlateModule } from './modules/info-plate/info-plate.module';

@Module({
  imports: [
    InfoPlateModule,
    ConfigModule.forRoot({ isGlobal: true }),
     MongooseModule.forRootAsync(mongoConfigAsync)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}