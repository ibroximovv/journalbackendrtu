
import { PartialType } from '@nestjs/swagger';
import { CreateJournalVersionDto } from './create-journal-version.dto';

export class UpdateJournalVersionDto extends PartialType(CreateJournalVersionDto) {}
