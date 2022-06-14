import { Role } from "src/modules/login/service/auth/role.enum";

export interface UserModel {
    _id:String;
    email: String;
    nombres: String;
    
   role: String[];
 /*   createdAt:any;
    updatedAt: any;*/


}