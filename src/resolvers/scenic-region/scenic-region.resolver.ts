import { Language } from './../../models/base.model';
import { CreateScenicSpotInfoInput } from './../scenic-spot/dto/create-scenic-spot.input';
import { ScenicRegionInfo } from './../../models/scenic-region.model';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import {
    CreateScenicRegionInfoInput,
    CreateScenicRegionInput,
} from './dto/create-scenic-region.input';
import { ScenicRegionService } from './../../services/biz/scenic-region.service';
import { ScenicRegion } from './../../models/scenic-region.model';
import { PrismaService } from '../../services/common/prisma.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

@Resolver((of) => ScenicRegion)
@UseGuards(GqlAuthGuard)
export class ScenicRegionResolver {
    constructor(
        private prisma: PrismaService,
        private readonly scenicRegionService: ScenicRegionService
    ) {}

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicRegion)
    async createScenicRegion(
        @Args('regionInput') regionInput: CreateScenicRegionInput,
        @Args('regionInfoInput') regionInfoInput: CreateScenicSpotInfoInput,
        @Args('lang') lang: Language
    ) {
        return await this.scenicRegionService.createScenicRegion(
            regionInput,
            regionInfoInput,
            lang
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicRegionInfo)
    async createScenicRegionInfoWithLang(
        @Args('scenicRegionId') scenicRegionId: string,
        @Args('regionInfoInput') regionInfoInput: CreateScenicRegionInfoInput,
        @Args('lang') lang: Language
    ) {
        return await this.scenicRegionService.createScenicRegionWithLang(
            scenicRegionId,
            regionInfoInput,
            lang
        );
    }
}
