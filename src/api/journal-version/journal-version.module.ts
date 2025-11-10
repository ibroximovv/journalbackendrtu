import { Module } from '@nestjs/common';
import { JournalVersionService } from './journal-version.service';
import { JournalVersionController } from './journal-version.controller';

@Module({
  controllers: [JournalVersionController],
  providers: [JournalVersionService],
})
export class JournalVersionModule {}
