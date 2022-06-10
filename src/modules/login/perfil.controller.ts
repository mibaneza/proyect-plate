import { Controller, Post, Res, Request, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './service/auth/auth.service';
import { JwtAuthGuard } from './service/auth/jwt-auth.guard';
import { Roles } from './service/auth/roles.decorator';
import { PerfilService } from './service/roles/perfil.service';

@Controller('info-plate/auth/role')
export class PerfilController {
    constructor(private perfilService: PerfilService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-perfil')
    @Roles('create-perfil')
    async createPerfil(@Res() res, @Body() payload: any){
        const response = await this.perfilService.createPerfil(payload);
        return res.status(response.status).json(response.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('read-perfil')
    @Roles('read-perfil')
    async readPerfil(@Res() res){
        const response = await this.perfilService.readPerfil();
        return res.status(response.status).json(response.body);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-perfil/:id')
    @Roles('update-perfil')
    async putPerfil(@Res() res, @Body() payload: any, @Param('id') id: string){
        const response = await this.perfilService.updatePerfil(payload,id);
        return res.status(response.status).json(response.body);
    }

}
