/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScenicRegionDTO } from './scenic-region.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Language } from '@prisma/client';

@ObjectType()
export class TouringRouteDTO extends BaseModel {
    @Field()
    scenicRegionId: string;
    @Field()
    touringRouteInfoDtos: TouringRouteInfoDTO[];
}

@ObjectType()
export class TouringRouteInfoDTO extends BaseModel {
    @Field()
    touringRouteId: string;
    @Field()
    title: string;
    @Field()
    content: string;
    @Field((type) => Language)
    lang: Language;
}
