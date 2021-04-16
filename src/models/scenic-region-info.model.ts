import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel, Language } from './base.model';

@ObjectType()
export class ScenicRegionInfo extends BaseModel {
    name: string;
    handDrawingUri: string;
    handDrawingNE: string;
    handDrawingSW: string;
    vrUrl: string;
    ticketUrl: string;
    title: string;
    layer: string;
    layerDisplayName: string;
    lang: Language;
}
