import { Controller, Post, Res, Request, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './service/auth/auth.service';
import { JwtAuthGuard } from './service/auth/jwt-auth.guard';
import { Role } from './service/auth/role.enum';
import { Roles } from './service/auth/roles.decorator';

@Controller('info-plate/auth')
export class LoginController {
    constructor(private authService: AuthService) {}
    

    @Post('login')
    async login(@Res() res, @Body() payload: any){
        const {email, password} = payload;
        const response = await this.authService.validateUserCredentials(email, password)
        return res.status(response.status).json(response.body);
    }
    

    @Get('create-user')
    async getAllInfoPlaca(@Res() res){
        const response = await this.authService.createUser();
        return res.status(200).json({status:true});
    }

    @UseGuards(JwtAuthGuard)
    @Get('user-info')
    @Roles('get-user-info')
    async getUserInfo(@Res() res, @Request() req) {
        console.log("req",req)
        const response = await this.authService.getInfoUser(req.user)
        return res.status(response.status).json(response.body);
    }
}
