import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from 'src/modules/login/service/auth/role.enum';
import { Perfil } from './perfil.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true, unique: true  })
    email: String;

    @Prop({ required: true })
    password: String;

    @Prop({ required: true })
    nombres: String;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'perfils' })
    perfilID: Perfil

    /*@Prop({ required: true, default: [Role.USER] })
    role: Role[];*/   

   /* @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
    detail: Object;
*/
}

export const UserSchena = SchemaFactory.createForClass(User);