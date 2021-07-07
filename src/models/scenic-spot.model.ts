/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScenicSpotTypeDTO } from './scenic-spot-type.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Language } from '@prisma/client';

@ObjectType()
export class ScenicSpotDTO extends BaseModel {
    @Field()
    scenicRegionId: string;
    @Field()
    displayName: string;
    @Field()
    scenicSpotTypeId: string;
    @Field()
    hidden?: boolean;
    @Field((type) => [ScenicSpotInfoDTO], {
        nullable: 'itemsAndList',
        defaultValue: [],
    })
    scenicSpotInfoDtos?: ScenicSpotInfoDTO[];
}
@ObjectType()
export class ScenicSpotInfoDTO extends BaseModel {
    @Field()
    scenicSpotId: string;
    @Field()
    name?: string;
    @Field()
    introduction?: string;
    @Field()
    iconUri?: string;
    @Field()
    audioUri?: string;
    @Field()
    imageUri?: string;
    @Field((type) => Language)
    lang: Language;
}
