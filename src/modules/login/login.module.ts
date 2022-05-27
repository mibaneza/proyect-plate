import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchena } from 'src/cshemas/user.schema';
import { JwtStrategy } from './service/auth/jwt.strategy';
import { LocalStrategy } from './service/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './service/auth/constants';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchena
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '7200s'}
    })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [LoginController]
})
export class LoginModule {}
