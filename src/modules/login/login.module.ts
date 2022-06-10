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
import { PerfilService } from './service/roles/perfil.service';
import { PerfilController } from './perfil.controller';
import { Perfil, PerfilSchena } from 'src/cshemas/perfil.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchena
      },
      {
        name: Perfil.name,
        schema: PerfilSchena
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '7200s'}
    })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, PerfilService],
  controllers: [LoginController, PerfilController]
})
export class LoginModule {}
