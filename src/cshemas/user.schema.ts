import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true, unique: true  })
    username: String;

    @Prop({ required: true })
    password: String;

}

export const UserSchena = SchemaFactory.createForClass(User);