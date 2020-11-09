import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';

import { PrecsModule } from './precs/precs.module';
import { IssuesModule } from './issues/issues.module';
import configuration from './config/configuration';

const dbInfo = configuration().database;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${dbInfo.host}:${dbInfo.port}/lawgic`),
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule,
    PrecsModule,
    IssuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
