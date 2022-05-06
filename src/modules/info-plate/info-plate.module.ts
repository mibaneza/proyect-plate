import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoPlate, InfoPlateSchena } from 'src/cshemas/info-plate.schema';
import { InfoPlateController } from './info-plate.controller';
import { InfoPlateService } from './service/info-plate.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
      name: InfoPlate.name,
      schema: InfoPlateSchena
    }])],
  controllers: [InfoPlateController],
  providers: [InfoPlateService]
})
export class InfoPlateModule {}
