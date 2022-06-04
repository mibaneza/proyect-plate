import { HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/cshemas/user.schema';
import e from 'express';
import { ResponseModel } from 'src/model/response.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { Role } from './role.enum';
import { UserModel } from 'src/model/user.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtTokenService: JwtService
    ) {

    }
    async generateToken(payload): Promise<ResponseModel> {
        const response: ResponseModel = {}
        const { email } = payload;
        //console.log(JSON.parse(JSON.stringify(payload)));
        const payloadAsing = JSON.parse(JSON.stringify(payload));
        const access_token = this.jwtTokenService.sign(payloadAsing)

        response['status'] = HttpStatus.OK;
        response['body'] = { success: true, result: { email, access_token } };
        return response;

    }

    async validateUserCredentials(username: string, password: string): Promise<ResponseModel> {

        this.jwtTokenService
        let response: ResponseModel = {}
        const userModel = this.userModel;
        let user: any;
        let payload: {} = {}
        function validateEmail(isEmail:string) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(isEmail);
          }
        function ValidEmail(){
            if (!validateEmail(username)) {
                response['status'] = HttpStatus.NOT_ACCEPTABLE;
                response['body'] = { success: false, err: 'Email no valido' };
                return false;
            }
            return true;
        }

        async function findUser() {
            user = await userModel.findOne({ email: username });
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

            if (verifyPass) {
                payload = {
                    email: user.email,
                    _id: user._id,
                    role: user.role
                }

                return true
            } else {
                response['status'] = HttpStatus.UNPROCESSABLE_ENTITY;
                response['body'] = { success: false, err: 'Credenciales no validas' };
                return false;
            }
        }

        async function validatePasswordUser(hashedPassword) {
            return await bcrypt.compare("a" + password + "A", hashedPassword);
        }


        try {
            let isEmail = await ValidEmail();
            if (!isEmail) return;
            let _findUser = await findUser();
            if (!_findUser) return;
            let _validateUser = await validateUser();
            if (!_validateUser) return;
         //   console.log("payload", payload);
            return response = await this.generateToken(payload);
        } catch (error) {

        } finally {
            return response;
        }



    }

    async loginWithCredentials(user: any) {
        const payload = { email: user.email, sub: user.userId };

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
            let newRegister = new this.userModel({ email: "user2022@gmail.com", password: hash, role: [Role.USER], nombres: "Test2 Test3" });
            await newRegister.save();
            result = true;
        } catch (error) {
            console.log(error);
            result = false;

        } finally {
            return result;
        }
    }

    async getInfoUser(user) {
        const { _id } = user;
        let response: ResponseModel = {}
        let userModel = await this.userModel.findById(_id);
        if (user) {

            const payload: UserModel = {
                _id:userModel._id.toString(),
                email: userModel.email,
                nombres: userModel.nombres,
                role: userModel.role
            };
            response['status'] = HttpStatus.OK;
            response['body'] = {
                success: true, result: payload
            }
            return response;
        }
        else {
            response['status'] = HttpStatus.UNPROCESSABLE_ENTITY;
            response['body'] = { success: false, err: 'Usuario no valido' };
            return response;
        }
    }
}