import { Module } from '@nestjs/common';
import { JournalAuthorService } from './journal-author.service';
import { JournalAuthorController } from './journal-author.controller';

@Module({
  controllers: [JournalAuthorController],
  providers: [JournalAuthorService],
})
export class JournalAuthorModule {}
