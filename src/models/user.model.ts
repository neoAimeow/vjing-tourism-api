/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql';
import { BaseModel } from './base.model';

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

registerEnumType(Role, {
    name: 'Role',
    description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
    email: string;
    name: string;
    role: Role;

    @HideField()
    password: string;
}
