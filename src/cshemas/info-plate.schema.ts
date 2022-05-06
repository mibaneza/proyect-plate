import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type InfoPlateDocument = InfoPlate & Document;
@Schema()
export class InfoPlate {

    @Prop({ required: true, unique: true })
    plate: String;

    @Prop({ required: true })
    rq: Boolean;
    
}
export const InfoPlateSchena = SchemaFactory.createForClass(InfoPlate);