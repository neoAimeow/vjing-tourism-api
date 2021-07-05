/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScenicSpotTypeDTO } from './scenic-spot-type.model';
import { ScenicRegionDTO } from './scenic-region.model';
import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Language } from '@prisma/client';

@ObjectType()
export class ScenicSpotDTO extends BaseModel {
    scenicRegionId: string;
    scenicRegion: ScenicRegionDTO;
    scenicSpotTypeId: string;
    scenicSpotType: ScenicSpotTypeDTO;
    hidden: boolean;
    scenicSpotInfos: ScenicSpotInfoDTO[];
}
@ObjectType()
export class ScenicSpotInfoDTO extends BaseModel {
    scenicSpotId: string;
    scenicSpot: ScenicSpotDTO;
    name: string;
    introduction: string;
    iconUri: string;
    audioUri: string;
    imageUri: string;
    lang: Language;
}
