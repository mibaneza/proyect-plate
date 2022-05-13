import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';

export type RegistersDocument = Registers & Document;

@Schema({ timestamps: true })
export class Registers {
    @Prop({ required: true })
    plate: String;

    @Prop()
    status: number = 0;

    @Prop({ required: true })
    detail: object;

    @Prop({ required: true })
    bumpers: Date;

    @Prop()
    finishedAt?: Date;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const RegistersSchena = SchemaFactory.createForClass(Registers);