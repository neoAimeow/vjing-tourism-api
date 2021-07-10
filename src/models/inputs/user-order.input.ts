import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum UserOrderField {
    id = 'id',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    name = 'name',
    email = 'email',
}

registerEnumType(UserOrderField, {
    name: 'UserOrderField',
    description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class UserOrder extends Order {
    field: UserOrderField;
}
