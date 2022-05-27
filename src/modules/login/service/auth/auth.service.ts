import { HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/cshemas/user.schema';
import e from 'express';
import { ResponseModel } from 'src/model/response.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtTokenService: JwtService
    ) {

    }
    async generateToken(username): Promise<ResponseModel> {
        const response: ResponseModel = {}

        const payload = {
            username
        }
        const access_token = this.jwtTokenService.sign(username)

        response['status'] = HttpStatus.OK;
        response['body'] = { success: true, result: { username, access_token } };
        return response;

    }

    async validateUserCredentials(username: string, password: string): Promise<ResponseModel> {
        
        this.jwtTokenService
        const response: ResponseModel = {}
        const userModel = this.userModel;
        let user: any;

        async function findUser() {
            user = await userModel.findOne({ username });
            if (user) return true;
            else {
                response['status'] = HttpStatus.UNPROCESSABLE_ENTITY;
                response['body'] = { success: false, err: 'Usuario no valido' };

                return false;
            }
        }

        async function validateUser() {
            let verifyPass = false;
            verifyPass = await validatePasswordUser(user.password);

            if (verifyPass) return true;
            else {
                response['status'] = HttpStatus.UNPROCESSABLE_ENTITY;
                response['body'] = { success: false, err: 'Credenciales no validas' };
                return false;
            }
        }

        async function validatePasswordUser(hashedPassword) {
            return await bcrypt.compare("a" + password + "A", hashedPassword);
        }


        try {
            let _findUser = await findUser();
            if (!_findUser) return;
            let _validateUser = validateUser();
            if (!_validateUser) return;

            return await this.generateToken(username);
        } catch (error) {

        } finally {
            return response;
        }



    }

    async loginWithCredentials(user: any) {
        const payload = { username: user.username, sub: user.userId };

        return {
            access_token: this.jwtTokenService.sign(payload),
        };
    }

    async createUser(): Promise<Boolean> {
        let result: Boolean = false;
        const password = "mewpassword";
        const saltOrRounds = 10;
        const hash = await bcrypt.hash("a" + password + "A", saltOrRounds);
        try {
            let newRegister = new this.userModel({ username: "admin2022", password: hash });
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