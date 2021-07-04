import { ScenicRegionInfo } from './../../models/scenic-region.model';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { CreateScenicRegionInput } from './dto/create-scenic-region.input';
import { ScenicRegionService } from './../../services/biz/scenic-region.service';
import { ScenicRegion } from './../../models/scenic-region.model';
import { PrismaService } from '../../services/common/prisma.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserEntity } from 'src/decorators/user.decorator';
import { User } from 'src/models/user.model';

@Resolver((of) => ScenicRegion)
@UseGuards(GqlAuthGuard)
export class ScenicRegionResolver {
    constructor(
        private prisma: PrismaService,
        private readonly scenicRegionService: ScenicRegionService
    ) {}

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicRegion)
    async createScenicRegion(@Args('input') data: CreateScenicRegionInput) {
        return await this.scenicRegionService.createScenicRegion(data);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicRegionInfo)
    async createScenicRegionInfoWithLang(
        @Args('data') data: CreateScenicRegionInput
    ) {
        return await this.scenicRegionService.createScenicRegionWithLang(data);
    }
}
