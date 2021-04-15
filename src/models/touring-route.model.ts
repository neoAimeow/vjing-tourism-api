import { ScenicRegion } from './scenic-region.model';
import { ObjectType } from '@nestjs/graphql';
import { BaseModel, Language } from './base.model';

@ObjectType()
export class TouringRoute extends BaseModel {
  scenicRegionId: string;
  scenicRegion: ScenicRegion;
  name: string;
  content: string;
  realNav: boolean;
  lang: Language;
}
