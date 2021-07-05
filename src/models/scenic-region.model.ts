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
    @Field()
    unionName: string;
    @Field()
    location: string;
    @Field()
    zoom: number;
    @Field()
    minZoom: number;
    @Field()
    maxZoom: number;
    @Field()
    enableNavigation: boolean;
    @Field()
    enablePoiLanguageSwitch: boolean;
    @Field()
    sliceState: SliceState;
    @Field()
    scenicRegionInfoDtos: ScenicRegionInfoDTO[];
}

@ObjectType()
export class ScenicRegionInfoDTO extends BaseModel {
    @Field()
    id: string;
    @Field()
    createdAt: Date;
    @Field()
    updatedAt: Date;
    @Field()
    scenicRegionId: string;
    @Field()
    name: string;
    @Field()
    title: string;
    @Field()
    layer: string;
    @Field()
    layersDisplayName: string;
    @Field()
    vrUrl: string;
    @Field()
    ticketUrl: string;
    @Field()
    handDrawingUri: string;
    @Field()
    handDrawingNE: string;
    @Field()
    handDrawingSW: string;
    @Field()
    lang: Language;
}
