import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Perfil } from 'src/cshemas/perfil.schema';
import { ResponseModel } from 'src/model/response.interface';

@Injectable()
export class PerfilService {
    constructor(
        @InjectModel('Perfil') private perfilModel: Model<Perfil>,
    ) { }

    async createPerfil(payload: any): Promise<ResponseModel> {
        const response: ResponseModel = {}
        try {
            let newRegister = new this.perfilModel(payload);
            await newRegister.save();
            response['status'] = HttpStatus.OK;
            response['body'] = { result: newRegister, success: true }


        } catch (error) {
            console.log(error);
            response['status'] = HttpStatus.NOT_FOUND;
            response['body'] = { err: error, success: false };
        } finally {
            return response;
        }
    }

    async readPerfil(): Promise<ResponseModel> {
        const response: ResponseModel = {}
        try {
            const listPerfil = await this.perfilModel.find()
            if (!!!listPerfil) {
                response['status'] = HttpStatus.NOT_FOUND;
                response['body'] = {
                    err: "No hay datos o es undefined el la respuesta",
                    success: false
                };
            }
            response['status'] = HttpStatus.OK;
            response['body'] = { result: listPerfil, success: true }
        } catch (error) {
            console.log(error);
            response['status'] = HttpStatus.NOT_FOUND;
            response['body'] = { err: error, success: false };
        } finally {
            return response;
        }
    }

    async updatePerfil(payload: any, id: string): Promise<ResponseModel> {
        const response: ResponseModel = {}
        try {
            let newUpdate = this.perfilModel.findByIdAndUpdate(id, payload, { new: true });
            if (!!!newUpdate) {
                response['status'] = HttpStatus.NOT_FOUND;
                response['body'] = {
                    err: "No hay datos o es undefined el la respuesta",
                    success: false
                };
            }
            response['status'] = HttpStatus.OK;
            response['body'] = { result: newUpdate, success: true }

        } catch (error) {
            console.log(error);
            response['status'] = HttpStatus.NOT_FOUND;
            response['body'] = { err: error, success: false };
        } finally {
            return response;
        }
    }
}