import { UsersService } from './../users/users.service';
import {
  OAuth2Strategy,
  VerifyFunction,
  IOAuth2StrategyOption,
} from 'passport-google-oauth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import configuration from '../config/configuration';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_OAUTH_WEB_ID,
      clientSecret: process.env.GOOGLE_OAUTH_WEB_PWD,
      callbackURL: 'http://localhost:4000/api/auth/google',
    } as IOAuth2StrategyOption);
  }

  async validate(payload: any) {
    return await this.usersService.readOne(payload.username);
  }
}
