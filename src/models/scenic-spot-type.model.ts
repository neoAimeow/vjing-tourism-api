/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScenicRegionDTO } from './scenic-region.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel } from './base.model';
import { Language } from '@prisma/client';

@ObjectType()
export class ScenicSpotTypeDTO extends BaseModel {
    @Field()
    scenicRegionId: string;
    @Field()
    unionName: string;
    @Field()
    rank: number;
    @Field((type) => [ScenicSpotTypeInfoDTO], {
        nullable: 'itemsAndList',
        defaultValue: [],
    })
    scenicSpotTypeInfoDtos: ScenicSpotTypeInfoDTO[];
}

@ObjectType()
export class ScenicSpotTypeInfoDTO extends BaseModel {
    @Field()
    scenicSpotTypeId: string;
    @Field()
    name: string;
    @Field((type) => Language)
    lang: Language;
}
