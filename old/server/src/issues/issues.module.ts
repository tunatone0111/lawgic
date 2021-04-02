import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Issue, IssueSchema } from 'src/issues/schemas/issue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Issue.name, schema: IssueSchema }]),
  ],
  providers: [IssuesService],
  controllers: [IssuesController],
})
export class IssuesModule {}
