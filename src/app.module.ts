import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoConfigAsync } from './config/mongo.config';
import { InfoPlateModule } from './modules/info-plate/info-plate.module';
import { LoginModule } from './modules/login/login.module';
import { jwtConstants } from './modules/login/service/auth/constants';
import { RolesGuard } from './modules/login/service/auth/roles.guard';

@Module({
  imports: [
    InfoPlateModule,
    ConfigModule.forRoot({ isGlobal: true }),
     MongooseModule.forRootAsync(mongoConfigAsync),
     LoginModule,
     JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '7200s'}
    })
     ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }],
})
export class AppModule {}
