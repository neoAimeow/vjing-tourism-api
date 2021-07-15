import { Float } from '@nestjs/graphql';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Language, SliceState } from '@prisma/client';
import { BaseModel } from './base.model';

registerEnumType(SliceState, {
    name: 'SliceState',
    description: 'ScenicRegion SliceState',
});

@ObjectType()
export class ScenicRegionDTO extends BaseModel {
    @Field() displayName: string;
    @Field() zoom: number;
    @Field() minZoom: number;
    @Field() maxZoom: number;
    @Field() enableNavigation: boolean;
    @Field((type) => Float) locationLat: number;
    @Field((type) => Float) locationLng: number;
    @Field((type) => Float) handDrawingNELat: number;
    @Field((type) => Float) handDrawingNELng: number;
    @Field((type) => Float) handDrawingSWLat: number;
    @Field((type) => Float) handDrawingSWLng: number;
    @Field() enablePoiLanguageSwitch: boolean;
    @Field() sliceState: SliceState;
    @Field((type) => [ScenicRegionInfoDTO], {
        nullable: 'itemsAndList',
        defaultValue: [],
    })
    scenicRegionInfoDtos?: ScenicRegionInfoDTO[];
}

@ObjectType()
export class ScenicRegionInfoDTO extends BaseModel {
    @Field() scenicRegionId: string;
    @Field() scenicRegion?: ScenicRegionDTO;
    @Field() name: string;
    @Field() title: string;
    @Field() layer: string;
    @Field() layersDisplayName: string;
    @Field() vrUrl: string;
    @Field() ticketUrl: string;
    @Field() handDrawingUri: string;
    @Field((type) => Language)
    lang: Language;
}
