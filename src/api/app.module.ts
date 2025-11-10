import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { SmsService } from './sms/sms.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { JournalModule } from './journal/journal.module';
import { AuthorModule } from './author/author.module';
import { JournalAuthorModule } from './journal-author/journal-author.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { ArticleAuthorModule } from './article-author/article-author.module';
import { KeywordModule } from './keyword/keyword.module';
import { ArticleKeywordModule } from './article-keyword/article-keyword.module';
import { ArticleCommentModule } from './article-comment/article-comment.module';
import { ReferanceModule } from './referance/referance.module';
import { ReferenceArticleModule } from './reference-article/reference-article.module';
import { JournalVersionModule } from './journal-version/journal-version.module';
import { AdminModule } from './admin/admin.module';
import { ImageMulterController } from 'src/infrastructure/multer/image/image-multer.controller';
import { ArticleMulterController } from 'src/infrastructure/multer/article/article-multer.controller';
import { JournalMulterController } from 'src/infrastructure/multer/journal/jouranl-multer.controller';
import { ArticleUserChatModule } from './article-user-chat/article-user-chat.module';
import { ArticleUserChatMessageModule } from './article-user-chat-message/article-user-chat-message.module';

@Module({
  imports: [PrismaModule, AuthModule, MailModule, 
    JwtModule.register({
      global: true,
      secret: config.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '4h' },
    }), UserModule, JournalModule, AuthorModule, JournalAuthorModule, CategoryModule, ArticleModule, ArticleAuthorModule, KeywordModule, ArticleKeywordModule, ArticleCommentModule, ReferanceModule, ReferenceArticleModule, JournalVersionModule, AdminModule, ArticleUserChatModule, ArticleUserChatMessageModule
    // CacheModule.register({
    //   ttl: 300,
    //   max: 100,
    //   isGlobal: true
    // }),
  ],
  controllers: [ImageMulterController, ArticleMulterController, JournalMulterController],
  providers: [SmsService],
})
export class AppModule {}
