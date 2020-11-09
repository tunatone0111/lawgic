import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue, IssueDocument } from 'src/schemas/issue.schema';
import { CreateIssueDto } from 'src/dto/create-issue.dto';

@Injectable()
export class IssuesService {
  constructor(
    @InjectModel(Issue.name) private issueModel: Model<IssueDocument>,
  ) {}

  async create(createIssueDto: CreateIssueDto): Promise<Issue> {
    const createdIssue = new this.issueModel(createIssueDto);
    return createdIssue.save();
  }

  async findAll(): Promise<Issue[]> {
    return this.issueModel.find().exec();
  }
}
