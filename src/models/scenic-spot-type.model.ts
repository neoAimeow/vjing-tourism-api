/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScenicRegion } from './scenic-region.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel, Language } from './base.model';

@ObjectType()
export class ScenicSpotType extends BaseModel {
    scenicRegionId: string;
    scenicRegion: ScenicRegion;
    rank: number;
    name: string;
    lang: Language;
}

@ObjectType()
export class ScenicSpotTypeBase extends BaseModel {
    scenicRegionId: string;
    scenicRegion: ScenicRegion;
    rank: number;
    scenicSpotTypeInfos: ScenicSpotTypeInfo[];
}

@ObjectType()
export class ScenicSpotTypeInfo extends BaseModel {
    scenicSpotTypeId: string;
    scenicSpotType: ScenicSpotTypeBase;
    name: string;
    lang: Language;
}
