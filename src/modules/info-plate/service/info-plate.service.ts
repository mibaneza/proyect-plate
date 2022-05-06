import { HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { InfoPlate } from 'src/cshemas/info-plate.schema';
import { InfoPlateModel } from 'src/model/info-plate.interface';
import { ResponseModel } from 'src/model/response.interface';
import { InfoPlateDTO } from '../dto/info-placa.dto';



@Injectable()
export class InfoPlateService {
    constructor(@InjectModel('InfoPlate') private readonly infoPlateModel: Model<InfoPlate>) { }

    async getInfoPlate(): Promise<ResponseModel> {
        const response: ResponseModel = {}
        try {
            const listPlate = await this.infoPlateModel.find()
            if (!!!listPlate) {
                response['success'] = false;
                response['status'] = 500;
                response['body'] = { err: 'No hay datos o es undefined el la respuesta' };
            }
            response['success'] = true;
            response['status'] = 500;
            response['body'] = { result: listPlate }

        } catch (error) {
            response['success'] = false;
            response['status'] = 500;
            response['body'] = { err: error };

        } finally {
            return response;
        }
    }

    async filterPlate(plates: string[]): Promise<ResponseModel> {
        const response: ResponseModel = {}
        try {
            let listPlatesDB = await this.infoPlateModel.find()
            if (!!!listPlatesDB) {
                response['status'] = HttpStatus.NOT_FOUND;
                response['body'] = {
                    success: false,
                    err: 'No hay datos o es undefined el la respuesta'
                };
            }

            const listPlates = listPlatesDB.map(x => x.toObject());

            let platesDTO: InfoPlateDTO[] = listPlates;
            for (const iterator of plates) {
                const isPlaca = listPlatesDB.find(x => x.plate == iterator);
                platesDTO.push({
                    plate: isPlaca.plate
                    , rq: isPlaca.rq
                })
            }
            response['status'] = 200;
            response['body'] = { success: true, result: platesDTO }

        } catch (error) {
            response['status'] = HttpStatus.NOT_FOUND;
            response['body'] = { success: false, err: error };
        } finally {
            return response;
        }
    }
}
