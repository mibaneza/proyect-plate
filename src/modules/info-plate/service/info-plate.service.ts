import { HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from "moment";

import { InfoPlate } from 'src/cshemas/info-plate.schema';
import { ResponseModel } from 'src/model/response.interface';
import { InfoPlateDTO } from '../dto/info-placa.dto';
import { SecondsToHour } from 'src/util/seconds-to-hour';
import { Audit } from 'src/cshemas/audit.schema';
import { Planified } from 'src/cshemas/planified.schema';
import { Registers } from 'src/cshemas/registers.schema';
import e from 'express';



@Injectable()
export class InfoPlateService {
    constructor(
        @InjectModel('InfoPlate') private readonly infoPlateModel: Model<InfoPlate>,
        @InjectModel('Audit') private auditModel: Model<Audit>,
        @InjectModel('Registers') private registersModel: Model<Registers>,
        @InjectModel('Planified') private planifiedModel: Model<Planified>,
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

    async getPlateRegistered(): Promise<ResponseModel> {
        const response: ResponseModel = {}
        try {
            const listRegisters = await this.registersModel.find()
            if (!!!listRegisters) {
                response['status'] = HttpStatus.NOT_FOUND;;
                response['body'] = { err: 'No hay datos o es undefined el la respuesta', success: false };
            }
            response['status'] = HttpStatus.OK;;
            response['body'] = { result: listRegisters, success: true }

        } catch (error) {
            response['status'] = HttpStatus.NOT_FOUND;;
            response['body'] = { err: error, success: false };

        } finally {
            return response;
        }
    }

    async filterPlate(platesObjetList: any): Promise<ResponseModel> {
        const response: ResponseModel = {}
        if (!!!platesObjetList || platesObjetList.length == 0) {
            response['status'] = HttpStatus.NOT_ACCEPTABLE;
            response['body'] = { success: false, err: "No as enviado placas" };
            return response;
        }
        platesObjetList.map((x: any) => x.plate = (x.plate.substring(0, 3) + '-' + x.plate.substring(3, 6)).toUpperCase());

        try {
            //let listPlatesDB = await this.infoPlateModel.find();
            // Si tiene mas de un millon de registro desconmentar la liniea 53 
            // y comentar la linea 51
            const inPlates = platesObjetList.map(x => x.plate);
            let listPlates = [];
            let listPlatesDB = await this.infoPlateModel.find({ plate: { $in: inPlates } });

            if (!!!listPlatesDB || listPlatesDB.length == 0) {
                listPlates = inPlates.map((x: any) => { return { plate: x, rq: false } });
            } else {
                listPlates = listPlatesDB.map(x => x.toObject());
                for (const iterator of platesObjetList) {
                    const isPlate = listPlates.find(x => x.plate == iterator.plate);
                    if (!!!isPlate) {
                        listPlates.push({ plate: iterator.plate, rq: false })
                    }
                }
            }
            for (const iterator of platesObjetList) {
                const createdAt = new Date();
                const registerI: Registers = {
                    createdAt,
                    bumpers: moment(createdAt).add(4, 'hours').toDate(),
                    detail: new Object(iterator),
                    plate: iterator.plate,
                    status: 0,
                    finishedAt: null
                }
                const isRegistersCreate = await this.createRegister(registerI);
                if (!isRegistersCreate) {
                    response['status'] = HttpStatus.CONFLICT;
                    response['body'] = { success: false, err: 'No se pudo registrar' }
                }
            }
            response['status'] = HttpStatus.OK;
            response['body'] = { success: true, result: { message: 'Existo en el registro' } };
        } catch (error) {
            console.log(error);
            response['status'] = HttpStatus.NOT_FOUND;
            response['body'] = { success: false, err: error.menssage };
        } finally {
            return response;
        }
    }

    async grafictOne(date: string = "202205"): Promise<ResponseModel> {
        const response: ResponseModel = {}
        const startDate: Date = moment(date, "YYYYMM").startOf('month').toDate();
        const endDate: Date = moment(date, "YYYYMM").endOf('month').toDate();
        try {
            const beetwen = {
                $gte: startDate,
                $lt: endDate
            }

            let listAuditDB = await this.auditModel.find({ inicioAt: beetwen });
            let listPlanifiedDB = await this.planifiedModel.find({ date: beetwen });
            if (listAuditDB.length == 0 || !!!listAuditDB) {
                response['status'] = HttpStatus.NOT_FOUND;
                response['body'] = {
                    success: false,
                    err: 'No hay registros de la auditoria'
                };
            }
            const listAudits = listAuditDB.map(x => x.toObject());
            const listPlanified = listPlanifiedDB.map(x => x.toObject());
            const array = Number(moment(date, "YYYYMM").endOf('month').format("DD"));
            const responseArray = [];
            for (let index = 1; index < array + 1; index++) {
                let day: string = "";
                day = String(index);
                if (index <= 9) {
                    day = "0" + String(index);
                }
                const fechaX = `${date}${day}`
                let fechaAudits = moment(fechaX, "YYYYMMDD").format("YYYY-MM-DD");

                const body = {
                    'quantityNTAE': 0,
                    'detail': [],
                    'planified': 0,
                    'date': moment(fechaX, "YYYYMMDD").format("DD/MM/YYYY")
                };

                for (const iterator of listAudits) {
                    if (moment(iterator.inicioAt).format("YYYY-MM-DD") == fechaAudits) {
                        body['quantityNTAE'] += iterator.cuantity;
                        body['detail'] = body['detail'].concat(iterator.detail);
                    }
                }

                for (const iterator of listPlanified) {
                    if (moment(iterator.date).format("YYYY-MM-DD") == fechaAudits) {
                        body['planified'] += iterator.cuantity;
                    }
                }
                responseArray.push(body);
            }

            response['status'] = HttpStatus.OK;
            response['body'] = { success: true, result: responseArray }

        } catch (error) {
            response['status'] = HttpStatus.NOT_FOUND;
            response['body'] = { success: false, err: error.menssage };
            console.log(error);
        } finally {
            return response;
        }




    }

    async createRegister(registerModel: Registers): Promise<Boolean> {
        let result: Boolean = false;
        try {
            let newRegister = new this.registersModel(registerModel);
            await newRegister.save();
            result = true;
        } catch (error) {
            console.log(error);
            result = false;

        } finally {
            return result;
        }
    }
}
