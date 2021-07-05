import { ScenicSpotDTO } from './../../models/scenic-spot.model';
import { PrismaService } from '../../services/common/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { Resolver, Query, Parent, Args, ResolveField } from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Resolver((of) => ScenicSpotDTO)
export class ScenicSpotResolver {
    constructor(private prisma: PrismaService) {}
}
