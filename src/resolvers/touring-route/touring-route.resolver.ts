import { TouringRouteDTO } from './../../models/touring-route.model';
import { PrismaService } from '../../services/common/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { Resolver, Query, Parent, Args, ResolveField } from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Resolver((of) => TouringRouteDTO)
export class TouringRouteResolver {
    constructor(private prisma: PrismaService) {}
}
