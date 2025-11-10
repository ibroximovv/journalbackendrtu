import { Module } from '@nestjs/common';
import { ReferanceService } from './referance.service';
import { ReferanceController } from './referance.controller';

@Module({
  controllers: [ReferanceController],
  providers: [ReferanceService],
})
export class ReferanceModule {}
