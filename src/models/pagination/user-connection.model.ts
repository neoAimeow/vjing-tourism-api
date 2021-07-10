import { UserDTO } from './../user.model';
import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';

@ObjectType()
export class UserConnection extends PaginatedResponse(UserDTO) {}
