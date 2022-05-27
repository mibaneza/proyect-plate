import { Controller, Post, Res,  Body, Get, Param, Put } from '@nestjs/common';

import { InfoPlateService } from './service/info-plate.service';

@Controller('info-plate')
export class InfoPlateController {

constructor(private infoPlateService: InfoPlateService) {}
    @Post('filter')
    async filterInfoPlaca(@Res() res, @Body() listPlate: any){
        const response = await this.infoPlateService.filterPlate(listPlate)
        return res.status(response.status).json(response.body);
    }

    @Get('all')
    async getAllInfoPlaca(@Res() res){
        const response = await this.infoPlateService.getPlateRegistered()
        return res.status(response.status).json(response.body);
    }

    @Get('lvlefficacy/:fecha')
    async getLvlEfffective(@Res() res, @Param('fecha') fecha: string){
        const response = await this.infoPlateService.graficLvlEfficacy(fecha)
        return res.status(response.status).json(response.body);
    } 

    @Get('lvlproductivity/:fecha')
    async getLvlProd(@Res() res, @Param('fecha') fecha: string){
        const response = await this.infoPlateService.graficLvlProductivity(fecha)
        return res.status(response.status).json(response.body);
    } 

 

    @Put('register/:id')
    async getRegisterId(@Res() res, @Param('id') id: string){
        const response = await this.infoPlateService.findByIdAndUpdateRegister(id)
        return res.status(response.status).json(response.body);
    }   
  
}
