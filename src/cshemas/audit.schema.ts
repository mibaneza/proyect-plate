import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';

export type AuditDocument = Audit & Document;

@Schema({ timestamps: true })
export class Audit {
    @Prop({ required: true })
    detail: String[];

    @Prop({ required: true })
    cuantity: number;

    @Prop()
    hour: String;

    @Prop()
    seconds: number;

    @Prop()
    milliseconds: number;

    @Prop()
    inicioAt: Date;

    @Prop()
    finAt: Date;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const AuditSchena = SchemaFactory.createForClass(Audit);