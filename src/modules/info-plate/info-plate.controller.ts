import { Controller, Post, Res, HttpStatus, Body, Get, Param } from '@nestjs/common';

import { InfoPlateService } from './service/info-plate.service';

@Controller('info-plate')
export class InfoPlateController {

constructor(private infoPlateService: InfoPlateService) {}
    @Post('filter')
    async filterInfoPlaca(@Res() res, @Body() listPlate: any){
        const response = await this.infoPlateService.filterPlate(listPlate)
        return res.status(response.status).json(response.body)
    }

    @Get('all')
    async getAllInfoPlaca(@Res() res){
        const response = await this.infoPlateService.getInfoPlate()
        return res.status(response.status).json(response.body)
    }

    @Get('morth/:fecha')
    async getGraOne(@Res() res, @Param('fecha') fecha: string){
        const response = await this.infoPlateService.grafictOne(fecha)
        return res.status(response.status).json(response.body)
    }   

    @Get('morth/:fecha')
    async postGraOne(@Res() res, @Param('fecha') fecha: string){
        const response = await this.infoPlateService.grafictOne(fecha)
        return res.status(response.status).json(response.body)
    }   
}
