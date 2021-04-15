import { ScenicRegion } from './scenic-region.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel, Language } from './base.model';

export enum ScenicSpotType {
  SHOP = 'SHOP',
  FOOD = 'FOOD',
  TOILET = 'TOILET',
  PARK = 'PARK',
  SERVICE_CENTER = 'SERVICE_CENTER',
  SPOT = 'SPOT',
  HOTEL = 'HOTEL',
}

registerEnumType(ScenicSpotType, {
  name: 'ScenicSpotType',
  description: 'ScenicSpot ScenicSpotType',
});

@ObjectType()
export class ScenicSpot extends BaseModel {
  scenicRegionId: string;
  scenicRegion: ScenicRegion;
  name: string;
  type: ScenicSpotType;
  audioUri: string;
  imageUri: string;
  introduction: string;
  iconUri: string;
  hidden: boolean;
  lang: Language;
}
