/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScenicRegion } from './scenic-region.model';
import { ObjectType } from '@nestjs/graphql';
import { BaseModel, Language } from './base.model';

@ObjectType()
export class TouringRoute extends BaseModel {
    scenicRegionId: string;
    scenicRegion: ScenicRegion;
    title: string;
    content: string;
    lang: Language;
}

@ObjectType()
export class TouringRouteBase extends BaseModel {
    scenicRegionId: string;
    scenicRegion: ScenicRegion;
}

@ObjectType()
export class TouringRouteInfo extends BaseModel {
    touringRouteId: string;
    touringRoute: TouringRouteBase;
    title: string;
    content: string;
    lang: Language;
}
