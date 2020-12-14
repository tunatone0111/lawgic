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
import { TermsModule } from './terms/terms.module';
import configuration from './config/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const dbInfo = configuration().database;
console.log(dbInfo);

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${dbInfo.user}:${dbInfo.pwd}@${dbInfo.host}:${dbInfo.port}/lawgic?authSource=admin`,
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web/build'),
    }),
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule,
    PrecsModule,
    IssuesModule,
    EmbedModule,
    AuthModule,
    TermsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
