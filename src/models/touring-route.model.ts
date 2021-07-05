/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScenicRegionDTO } from './scenic-region.model';
import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Language } from '@prisma/client';

@ObjectType()
export class TouringRouteDTO extends BaseModel {
    scenicRegionId: string;
    scenicRegion: ScenicRegionDTO;
    touringRouteInfoDtos: TouringRouteInfoDTO[];
}

@ObjectType()
export class TouringRouteInfoDTO extends BaseModel {
    touringRouteId: string;
    touringRoute: TouringRouteDTO;
    title: string;
    content: string;
    lang: Language;
}
