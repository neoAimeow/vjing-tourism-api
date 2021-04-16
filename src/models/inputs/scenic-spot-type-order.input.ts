import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum ScenicSpotTypeOrderField {
    id = 'id',
    rank = 'rank',
}

registerEnumType(ScenicSpotTypeOrderField, {
    name: 'ScenicSpotTypeOrderField',
    description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class ScenicSpotTypeOrder extends Order {
    field: ScenicSpotTypeOrderField;
}
