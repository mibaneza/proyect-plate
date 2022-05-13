import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';

export type PlanifiedDocument = Planified & Document;

@Schema()
export class Planified {

    @Prop()
    date: String; //2022-05-13

    @Prop()
    cuantity: number = 0;

}

export const PlanifiedSchena = SchemaFactory.createForClass(Planified);