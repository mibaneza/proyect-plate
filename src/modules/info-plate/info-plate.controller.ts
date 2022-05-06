import { Controller, Post, Res, HttpStatus, Body, Get } from '@nestjs/common';

import { InfoPlateService } from './service/info-plate.service';

@Controller('info-plate')
export class InfoPlateController {

constructor(private infoPlateService: InfoPlateService) {}
    @Post('filter')
    async filterInfoPlaca(@Res() res, @Body() listPlate: { plates : string[] }){
        const response = await this.infoPlateService.filterPlate(listPlate.plates)
        return res.status(response.status).json(response.body)
    }

    @Get('all')
    async getAllInfoPlaca(@Res() res){
        const response = await this.infoPlateService.getInfoPlate()
        return res.status(response.status).json(response.body)
    }
    
}
