import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GroupModule } from './group/group.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, GroupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
