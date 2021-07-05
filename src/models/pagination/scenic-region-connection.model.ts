import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { ScenicRegionDTO } from '../scenic-region.model';

@ObjectType()
export class ScenicRegionConnection extends PaginatedResponse(
    ScenicRegionDTO
) {}
