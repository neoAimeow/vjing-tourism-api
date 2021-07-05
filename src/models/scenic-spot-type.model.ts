/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScenicRegionDTO } from './scenic-region.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel } from './base.model';
import { Language } from '@prisma/client';

@ObjectType()
export class ScenicSpotTypeDTO extends BaseModel {
    scenicRegionId: string;
    scenicRegion: ScenicRegionDTO;
    rank: number;
    scenicSpotTypeInfos: ScenicSpotTypeInfoDTO[];
}

@ObjectType()
export class ScenicSpotTypeInfoDTO extends BaseModel {
    scenicSpotTypeId: string;
    name: string;
    lang: Language;
}
