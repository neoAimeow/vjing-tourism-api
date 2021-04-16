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
