import { Role } from "src/modules/login/service/auth/role.enum";

export interface UserModel {
    _id:String;
    email: String;
    nombres: String;
    
   perfil: any;
 /*   createdAt:any;
    updatedAt: any;*/


}