import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateIssueDto } from 'src/dto/create-issue.dto';
import { IssuesService } from './issues.service';

@Controller('api/issues')
export class IssuesController {
  constructor(private issuesService: IssuesService) {}

  @Get()
  async getIssues() {
    return this.issuesService.findAll();
  }

  @Post()
  async postIssues(@Body() issue: CreateIssueDto) {
    return this.issuesService.create(issue);
  }
}
