/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Language } from '@prisma/client';

@ObjectType()
export class ScenicSpotTypeDTO extends BaseModel {
    @Field()
    displayName: string;
    @Field()
    rank: number;
    @Field((type) => [ScenicSpotTypeInfoDTO], {
        nullable: 'itemsAndList',
        defaultValue: [],
    })
    scenicSpotTypeInfoDtos?: ScenicSpotTypeInfoDTO[];
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
