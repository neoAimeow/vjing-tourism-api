/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel, Language } from './base.model';

export enum SliceState {
    PENDING = 0,
    SLICING = 1,
    SUCCESS = 2,
}

registerEnumType(SliceState, {
    name: 'SliceState',
    description: 'ScenicRegion SliceState',
});

//由ScenicRegionBase和ScenicRegionInfo
export class ScenicRegion extends BaseModel {
    @Field({ description: '景点的位置坐标，json字符串' })
    location: string;
    @Field({ description: '景点初始缩放倍数' })
    zoom: number;
    @Field({ description: '景点最小缩放倍数' })
    minZoom: number;
    @Field({ description: '景点最大缩放倍数' })
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
    lang: Language;
}
@ObjectType()
export class ScenicRegionBase extends BaseModel {
    location: string;
    zoom: number;
    minZoom: number;
    maxZoom: number;
    enableNavigation: boolean;
    enablePoiLanguageSwitch: boolean;
    sliceState: SliceState;
    scenicRegions: ScenicRegionInfo[];
}

@ObjectType()
export class ScenicRegionInfo extends BaseModel {
    scenicRegionId: string;
    scenicRegion: ScenicRegionBase;
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
