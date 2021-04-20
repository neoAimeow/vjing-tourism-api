/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { CreateScenicRegionInput } from './dto/update-scenic-region.input';
import { ScenicRegionService } from './../../services/biz/scenic-region.service';
import { ScenicRegion } from './../../models/scenic-region.model';
import { PrismaService } from '../../services/common/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import {
    Resolver,
    Mutation,
    Args,
    Parent,
    ResolveField,
} from '@nestjs/graphql';

import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Resolver((of) => ScenicRegion)
export class ScenicRegionResolver {
    constructor(
        private prisma: PrismaService,
        private readonly scenicRegionService: ScenicRegionService
    ) {}
    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicRegion)
    async createScenicRegionService(
        @Args('data') data: CreateScenicRegionInput
    ) {
        return await this.scenicRegionService.createScenicRegion(data);
    }
}
