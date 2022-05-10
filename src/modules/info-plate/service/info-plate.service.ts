import { HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { InfoPlate } from 'src/cshemas/info-plate.schema';
import { InfoPlateModel } from 'src/model/info-plate.interface';
import { ResponseModel } from 'src/model/response.interface';
import { InfoPlateDTO } from '../dto/info-placa.dto';
import { SecondsToHour } from 'src/util/seconds-to-hour';
import { AuditModel } from 'src/model/audit.interface';
import { Audit } from 'src/cshemas/audit.schema';



@Injectable()
export class InfoPlateService {
    constructor(
        @InjectModel('InfoPlate') private readonly infoPlateModel: Model<InfoPlate>,
        @InjectModel('Audit') private auditModel: Model<Audit>,
        private secondsToHour: SecondsToHour) { }

    async getInfoPlate(): Promise<ResponseModel> {
        const response: ResponseModel = {}
        try {
            const listPlate = await this.infoPlateModel.find()
            if (!!!listPlate) {
                response['success'] = false;
                response['status'] = HttpStatus.NOT_FOUND;;
                response['body'] = { err: 'No hay datos o es undefined el la respuesta' };
            }
            response['success'] = true;
            response['status'] = HttpStatus.OK;;
            response['body'] = { result: listPlate }

        } catch (error) {
            response['success'] = false;
            response['status'] = HttpStatus.NOT_FOUND;;
            response['body'] = { err: error };

        } finally {
            return response;
        }
    }

    async filterPlate(plates: string[]): Promise<ResponseModel> {
        const response: ResponseModel = {}

        try {
            const createdAt = new Date();

            let listPlatesDB = await this.infoPlateModel.find();
            // Si tiene mas de un millon de registro desconmentar la liniea 53 
            // y comentar la linea 51
            //let listPlatesDB = await this.infoPlateModel.find({ plate: $in: plates });
            if (!!!listPlatesDB || listPlatesDB.length == 0) {
                response['status'] = HttpStatus.NOT_FOUND;
                response['body'] = {
                    success: false,
                    err: 'No hay registros de la placa'
                };
            }

            const listPlates = listPlatesDB.map(x => x.toObject());

            let platesDTO: InfoPlateDTO[] = [];

            for (const iterator of plates) {
                const isPlaca = listPlates.find(x => x.plate.toUpperCase() == iterator.toUpperCase());
                !!isPlaca && platesDTO.push({
                    plate: isPlaca.plate
                    , rq: isPlaca.rq
                })
            }
            const updatedAt = new Date();
            const { hourToString, secondsToNumber, millisecondsToNumber, inicioAt, finAt } =
             this.secondsToHour.diff(createdAt, updatedAt);
            console.log(createdAt);
            console.log(updatedAt);
            const auditI: Audit = {
                'cuantity': plates.length,
                'detail': plates,
                'hour': hourToString,
                'seconds': secondsToNumber,
                'milliseconds': millisecondsToNumber, 
                inicioAt,
                finAt
            }
            const isAuditCreate = await this.createAudit(auditI);
            if (!isAuditCreate) {
                response['status'] = HttpStatus.CONFLICT;
                response['body'] = { success: false, err: 'No se pudo crear la Auditoria' }
            }
            response['status'] = HttpStatus.OK;
            response['body'] = { success: true, result: platesDTO }

        } catch (error) {
            console.log(error);
            response['status'] = HttpStatus.NOT_FOUND;
            response['body'] = { success: false, err: error.menssage };
        } finally {
            return response;
        }
    }

    async createAudit(auditModel: Audit): Promise<Boolean> {
        let result: Boolean = false;
        try {
            let newAudit = new this.auditModel(auditModel);
            await newAudit.save();
            result = true;
        } catch (error) {
            console.log(error);
            result = false;

        } finally {
            return result;
        }

    }
}
