import { Controller, Post, Res, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../login/service/auth/jwt-auth.guard';
import { Role } from '../login/service/auth/role.enum';
import { Roles } from '../login/service/auth/roles.decorator';

import { InfoPlateService } from './service/info-plate.service';

@Controller('info-plate')
export class InfoPlateController {

    constructor(private infoPlateService: InfoPlateService) { }

    @UseGuards(JwtAuthGuard)
    @Post('filter')
    @Roles('filter-info-placa')
    async filterInfoPlaca(@Res() res, @Body() listPlate: any) {
        const response = await this.infoPlateService.filterPlate(listPlate)
        return res.status(response.status).json(response.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    @Roles('get-all-info-placa')
    async getAllInfoPlaca(@Res() res) {
        const response = await this.infoPlateService.getPlateRegistered()
        return res.status(response.status).json(response.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('lvlefficacy/:fecha')
    @Roles('get-lvlefficacy')
    async getLvlEfffective(@Res() res, @Param('fecha') fecha: string) {
        const response = await this.infoPlateService.graficLvlEfficacy(fecha)
        return res.status(response.status).json(response.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('lvlproductivity/:fecha')
    @Roles('get-lvlproductivity')
    async getLvlProd(@Res() res, @Param('fecha') fecha: string) {
        const response = await this.infoPlateService.graficLvlProductivity(fecha)
        return res.status(response.status).json(response.body);
    }


    @UseGuards(JwtAuthGuard)
    @Put('register/:id')
    @Roles('put-register')
    async getRegisterId(@Res() res, @Param('id') id: string) {
        const response = await this.infoPlateService.findByIdAndUpdateRegister(id)
        return res.status(response.status).json(response.body);
    }

}
