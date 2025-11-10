-- CreateIndex
CREATE INDEX "Article_userId_categoryId_idx" ON "Article"("userId", "categoryId");

-- CreateIndex
CREATE INDEX "ArticleAuthor_articleId_authorId_idx" ON "ArticleAuthor"("articleId", "authorId");

-- CreateIndex
CREATE INDEX "ArticleComment_articleId_userId_idx" ON "ArticleComment"("articleId", "userId");

-- CreateIndex
CREATE INDEX "ArticleKeyword_articleId_keywordId_idx" ON "ArticleKeyword"("articleId", "keywordId");

-- CreateIndex
CREATE INDEX "ArticleUserChat_fromId_toId_idx" ON "ArticleUserChat"("fromId", "toId");

-- CreateIndex
CREATE INDEX "ArticleUserChatMessage_articleUserChatId_fromId_toId_idx" ON "ArticleUserChatMessage"("articleUserChatId", "fromId", "toId");

-- CreateIndex
CREATE INDEX "Journal_userId_idx" ON "Journal"("userId");

-- CreateIndex
CREATE INDEX "JournalAuthor_journalId_authorId_idx" ON "JournalAuthor"("journalId", "authorId");

-- CreateIndex
CREATE INDEX "JournalVersion_journalId_articleId_userId_idx" ON "JournalVersion"("journalId", "articleId", "userId");

-- CreateIndex
CREATE INDEX "Reference_userId_idx" ON "Reference"("userId");

-- CreateIndex
CREATE INDEX "ReferenceArticle_articleId_referenceId_idx" ON "ReferenceArticle"("articleId", "referenceId");

-- CreateIndex
CREATE INDEX "ReviewArticle_articleId_idx" ON "ReviewArticle"("articleId");
