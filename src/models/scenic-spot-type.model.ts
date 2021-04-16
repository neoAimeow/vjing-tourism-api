import { ScenicRegion } from './scenic-region.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel, Language } from './base.model';

@ObjectType()
export class ScenicSpotType extends BaseModel {
  scenicRegionId: string;
  scenicRegion: ScenicRegion;
  name: string;
  rank: number;
  lang: Language;
}
