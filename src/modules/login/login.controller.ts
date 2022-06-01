import { Controller, Post, Res,  Body, Get, Param, Put } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';

@Controller('auth')
export class LoginController {
    constructor(private authService: AuthService) {}
    
    @Post('login')
    async filterInfoPlaca(@Res() res, @Body() payload: any){
        const {username, password} = payload;
        const response = await this.authService.validateUserCredentials(username, password)
        return res.status(response.status).json(response.body);
    }

    @Get('user')
    async getAllInfoPlaca(@Res() res){
        const response = await this.authService.createUser()
        return res.status(200).json({status:true});
    }
}
