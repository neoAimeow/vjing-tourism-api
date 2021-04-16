import { TouringRoute } from './../touring-route.model';
import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';

@ObjectType()
export class TouringRouteConnection extends PaginatedResponse(TouringRoute) {}
