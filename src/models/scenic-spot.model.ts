import { ScenicSpotType } from './scenic-spot.model';
import { ScenicRegion } from './scenic-region.model';
import { ObjectType } from '@nestjs/graphql';
import { BaseModel, Language } from './base.model';

@ObjectType()
export class ScenicSpot extends BaseModel {
  scenicRegionId: string;
  scenicRegion: ScenicRegion;
  scenicSpotTypeId: string;
  scenicSpotType: ScenicSpotType;
  name: string;
  introduction: string;
  iconUri: string;
  audioUri: string;
  imageUri: string;
  lang: Language;
  hidden: boolean;
}
