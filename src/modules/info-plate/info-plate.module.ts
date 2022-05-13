import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Audit, AuditSchena } from 'src/cshemas/audit.schema';
import { InfoPlate, InfoPlateSchena } from 'src/cshemas/info-plate.schema';
import { Planified, PlanifiedSchena } from 'src/cshemas/planified.schema';
import { Registers, RegistersSchena } from 'src/cshemas/registers.schema';
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
        name: Planified.name,
        schema: PlanifiedSchena
      },
      {
        name: Audit.name,
        schema: AuditSchena
      },
      {
        name: Registers.name,
        schema: RegistersSchena
      }
    ])],
  controllers: [InfoPlateController],
  providers: [InfoPlateService, SecondsToHour]
})
export class InfoPlateModule { }
