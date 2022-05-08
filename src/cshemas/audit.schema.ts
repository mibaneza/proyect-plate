import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';

export type AuditDocument = Audit & Document;

@Schema({ timestamps: true })
export class Audit {
    @Prop({ required: true })
    detail: String[];

    @Prop({ required: true })
    cuantity: Number;

    @Prop()
    hour: String;

    @Prop()
    seconds: Number;

    @Prop()
    milliseconds: Number;

    @Prop()
    inicioAt: String

    @Prop()
    finAt: String

    @Prop()
    createdAt?: Date

    @Prop()
    updatedAt?: Date
}

export const AuditSchena = SchemaFactory.createForClass(Audit);