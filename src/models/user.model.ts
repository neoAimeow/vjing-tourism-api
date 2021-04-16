import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { ScenicSpot } from './scenic-spot.model';
import { TouringRoute } from './touring-route.model';

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
