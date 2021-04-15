import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.model';
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

@ObjectType()
export class ScenicRegion extends BaseModel {
  name: string;
  latitude: number;
  longitude: number;
  handDrawingUri: string;
  handDrawingNE: string;
  handDrawingSW: string;
  vrUrl: string;
  ticketUrl: string;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  title: string;
  layer: string;
  layerDisplayName: string;
  enableNavigation: boolean;
  enablePoiLanguageSwitch: boolean;
  SliceState: SliceState;
  lang: Language;
}
