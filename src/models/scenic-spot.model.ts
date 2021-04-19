/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScenicSpotType } from './scenic-spot-type.model';
import { ScenicRegion } from './scenic-region.model';
import { ObjectType } from '@nestjs/graphql';
import { BaseModel, Language } from './base.model';

@ObjectType()
export class ScenicSpot extends BaseModel {
    scenicRegionId: string;
    scenicRegion: ScenicRegion;
    scenicSpotTypeId: string;
    scenicSpotType: ScenicSpotType;
    hidden: boolean;

    name: string;
    introduction: string;
    iconUri: string;
    audioUri: string;
    imageUri: string;
    lang: Language;
}

@ObjectType()
export class ScenicSpotBase extends BaseModel {
    scenicRegionId: string;
    scenicRegion: ScenicRegion;
    scenicSpotTypeId: string;
    scenicSpotType: ScenicSpotType;
    hidden: boolean;
    scenicSpotInfos: ScenicSpotInfo[];
}
@ObjectType()
export class ScenicSpotInfo extends BaseModel {
    scenicSpotId: string;
    scenicSpot: ScenicSpotBase;
    name: string;
    introduction: string;
    iconUri: string;
    audioUri: string;
    imageUri: string;
    lang: Language;
}
