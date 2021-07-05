/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScenicSpotTypeDTO } from './../../models/scenic-spot-type.model';
import { PrismaService } from '../../services/common/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { Resolver, Query, Parent, Args, ResolveField } from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Resolver((of) => ScenicSpotTypeDTO)
export class ScenicSpotTypeResolver {
    constructor(private prisma: PrismaService) {}
}
