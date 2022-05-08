import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Audit, AuditSchena } from 'src/cshemas/audit.schema';
import { InfoPlate, InfoPlateSchena } from 'src/cshemas/info-plate.schema';
import { SecondsToHour } from 'src/util/seconds-to-hour';
import { InfoPlateController } from './info-plate.controller';
import { InfoPlateService } from './service/info-plate.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InfoPlate.name,
        schema: InfoPlateSchena
      },
      {
        name: Audit.name,
        schema: AuditSchena
      }
    ])],
  controllers: [InfoPlateController],
  providers: [InfoPlateService, SecondsToHour]
})
export class InfoPlateModule { }
