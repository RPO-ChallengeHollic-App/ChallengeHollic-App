import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/scripts/default-index';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private _config: ConfigService) {
    super({
      datasources: {
        db: {
          url: _config.get('DATABASE_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
