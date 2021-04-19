import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { ScenicRegion } from '../scenic-region.model';

@ObjectType()
export class ScenicRegionConnection extends PaginatedResponse(ScenicRegion) {}
