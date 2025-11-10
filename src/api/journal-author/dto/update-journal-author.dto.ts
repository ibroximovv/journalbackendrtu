
import { PartialType } from '@nestjs/swagger';
import { CreateJournalAuthorDto } from './create-journal-author.dto';

export class UpdateJournalAuthorDto extends PartialType(CreateJournalAuthorDto) {}
