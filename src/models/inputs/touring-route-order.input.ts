import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum TouringRouteOrderField {
    id = 'id',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
}

registerEnumType(TouringRouteOrderField, {
    name: 'TouringRouteOrderField',
    description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class TouringRouteOrder extends Order {
    field: TouringRouteOrderField;
}
