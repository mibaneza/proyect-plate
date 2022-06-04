import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Role } from 'src/modules/login/service/auth/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true, unique: true  })
    email: String;

    @Prop({ required: true })
    password: String;

    @Prop({ required: true })
    nombres: String;

    @Prop({ required: true, default: [Role.USER] })
    role: Role[];   

}

export const UserSchena = SchemaFactory.createForClass(User);