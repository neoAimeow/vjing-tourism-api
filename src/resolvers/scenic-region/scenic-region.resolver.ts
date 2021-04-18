import { ScenicRegion } from './../../models/scenic-region.model';
import { PrismaService } from '../../services/common/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { Resolver, Query, Parent, Args, ResolveField } from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Resolver((of) => ScenicRegion)
export class ScenicRegionResolver {
    constructor(private prisma: PrismaService) {}
}
