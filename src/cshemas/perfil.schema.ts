import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';

export type PerfilDocument = Perfil & Document;

@Schema({ timestamps: true })
export class Perfil {

    @Prop({ required: true, unique: true  })
    name: String;

    @Prop()
    role: String[]; 

}

export const PerfilSchena = SchemaFactory.createForClass(Perfil);