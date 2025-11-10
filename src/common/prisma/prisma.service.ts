import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IDatabaseService } from '../interfaces/database.interface';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, IDatabaseService
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async transaction<T = any>(actions: any[]): Promise<T[]> {
    return this.$transaction(actions);
  }
  
  getModel<T = any>(model: string): T {
    return (this as any)[model];
  }
}
