/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { SliceState } from '@prisma/client';
import { BaseModel, Language } from './base.model';

registerEnumType(SliceState, {
    name: 'SliceState',
    description: 'ScenicRegion SliceState',
});

//由ScenicRegionBase和ScenicRegionInfo
@ObjectType()
export class ScenicRegion extends BaseModel {
    @Field()
    unionName: string;
    @Field({ description: '景点的位置坐标，json字符串' })
    location: string;
    @Field({ description: '景点缩放' })
    zoom: number;
    @Field({ description: '最小缩放倍数' })
    minZoom: number;
    @Field({ description: '最大缩放倍数' })
    maxZoom: number;
    @Field()
    enableNavigation: boolean;
    @Field()
    enablePoiLanguageSwitch: boolean;
    @Field()
    sliceState: SliceState;
    @Field()
    name: string;
    @Field({ nullable: true })
    handDrawingUri: string;
    @Field({ nullable: true })
    handDrawingNE: string;
    @Field({ nullable: true })
    handDrawingSW: string;
    @Field({ nullable: true })
    vrUrl: string;
    @Field({ nullable: true })
    ticketUrl: string;
    @Field({ nullable: true })
    title: string;
    @Field({ nullable: true })
    layer: string;
    @Field({ nullable: true })
    layerDisplayName: string;
    @Field()
    lang: Language;
}
@ObjectType()
export class ScenicRegionBase extends BaseModel {
    unionName: string;
    location: string;
    zoom: number;
    minZoom: number;
    maxZoom: number;
    enableNavigation: boolean;
    enablePoiLanguageSwitch: boolean;
    sliceState: SliceState;
}

@ObjectType()
export class ScenicRegionInfo extends BaseModel {
    scenicRegionId: string;
    name: string;
    handDrawingUri: string;
    handDrawingNE: string;
    handDrawingSW: string;
    vrUrl: string;
    ticketUrl: string;
    title: string;
    layer: string;
    layersDisplayName: string;
    lang: Language;
}
