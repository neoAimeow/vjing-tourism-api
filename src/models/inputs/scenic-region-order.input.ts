import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum ScenicRegionOrderField {
    id = 'id',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    name = 'name',
}

registerEnumType(ScenicRegionOrderField, {
    name: 'ScenicRegionOrderField',
    description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class ScenicRegionOrder extends Order {
    field: ScenicRegionOrderField;
}
