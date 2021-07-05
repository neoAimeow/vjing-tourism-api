import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { ScenicSpotDTO } from './../scenic-spot.model';

@ObjectType()
export class ScenicSpotConnection extends PaginatedResponse(ScenicSpotDTO) {}
