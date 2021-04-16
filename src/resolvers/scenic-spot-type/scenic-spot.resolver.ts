import { ScenicSpotType } from './../../models/scenic-spot-type.model';
import { PrismaService } from './../../services/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { Resolver, Query, Parent, Args, ResolveField } from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Resolver((of) => ScenicSpotType)
export class ScenicSpotTypeResolver {
    constructor(private prisma: PrismaService) {}
}
