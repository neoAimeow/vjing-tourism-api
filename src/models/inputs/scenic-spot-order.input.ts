import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum ScenicSpotOrderField {
    id = 'id',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
}

registerEnumType(ScenicSpotOrderField, {
    name: 'ScenicSpotOrderField',
    description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class ScenicSpotOrder extends Order {
    field: ScenicSpotOrderField;
}
