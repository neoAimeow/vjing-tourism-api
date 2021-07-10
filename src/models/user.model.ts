import { Role } from '@prisma/client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ObjectType,
    registerEnumType,
    HideField,
    Field,
} from '@nestjs/graphql';
import { BaseModel } from './base.model';

registerEnumType(Role, {
    name: 'Role',
    description: 'User role',
});

@ObjectType()
export class UserDTO extends BaseModel {
    @Field()
    email: string;
    @Field()
    name: string;
    @Field((type) => Role)
    role: Role;
    @HideField()
    password: string;
}
