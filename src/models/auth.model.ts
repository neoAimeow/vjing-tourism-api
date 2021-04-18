/* eslint-disable @typescript-eslint/no-unused-vars */

import { ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
    user: User;
}
