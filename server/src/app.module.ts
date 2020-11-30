import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';

import { PrecsModule } from './precs/precs.module';
import { IssuesModule } from './issues/issues.module';
import { EmbedModule } from './embed/embed.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

const dbInfo = configuration().database;
console.log(dbInfo);

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${dbInfo.user}:${dbInfo.pwd}@${dbInfo.host}:${dbInfo.port}/lawgic?authSource=admin`,
    ),
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule,
    PrecsModule,
    IssuesModule,
    EmbedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
