import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { ScenicSpot } from './../scenic-spot.model';

@ObjectType()
export class ScenicSpotConnection extends PaginatedResponse(ScenicSpot) {}
