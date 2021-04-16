import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

export enum SliceState {
    PENDING = 0,
    SLICING = 1,
    SUCCESS = 2,
}

registerEnumType(SliceState, {
    name: 'SliceState',
    description: 'ScenicRegion SliceState',
});

@ObjectType()
export class ScenicRegion extends BaseModel {
    location: string;
    zoom: number;
    minZoom: number;
    maxZoom: number;

    enableNavigation: boolean;
    enablePoiLanguageSwitch: boolean;
    SliceState: SliceState;
}
