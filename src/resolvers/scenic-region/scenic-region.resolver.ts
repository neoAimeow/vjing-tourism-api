import { ScenicRegionOrder } from './../../models/inputs/scenic-region-order.input';
import { ScenicRegionConnection } from './../../models/pagination/scenic-region-connection.model';
import { CreateScenicSpotInfoInput } from './../scenic-spot/dto/create-scenic-spot.input';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import {
    CreateScenicRegionInfoInput,
    CreateScenicRegionInput,
} from './dto/create-scenic-region.input';
import { ScenicRegionService } from './../../services/biz/scenic-region.service';
import {
    ScenicRegionDTO,
    ScenicRegionInfoDTO,
} from './../../models/scenic-region.model';
import { PrismaService } from '../../services/common/prisma.service';
import {
    Resolver,
    Mutation,
    Args,
    ResolveField,
    Parent,
    Int,
    Query,
} from '@nestjs/graphql';
import { Language } from '@prisma/client';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import {
    UpdateScenicRegionInfoInput,
    UpdateScenicRegionInput,
} from './dto/update-scenic-region.input';

@Resolver((of) => ScenicRegionDTO)
export class ScenicRegionResolver {
    constructor(
        private prisma: PrismaService,
        private readonly scenicRegionService: ScenicRegionService
    ) {}

    // @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicRegionDTO)
    async createScenicRegion(
        @Args('regionInput') regionInput: CreateScenicRegionInput,
        @Args('regionInfoInput') regionInfoInput: CreateScenicRegionInfoInput,
        @Args('lang') lang: Language
    ): Promise<ScenicRegionDTO> {
        return await this.scenicRegionService.createScenicRegion(
            regionInput,
            regionInfoInput,
            lang
        );
    }

    // @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicRegionInfoDTO)
    async createScenicRegionInfoWithLang(
        @Args('scenicRegionId') scenicRegionId: string,
        @Args('regionInfoInput') regionInfoInput: CreateScenicRegionInfoInput,
        @Args('lang') lang: Language
    ): Promise<ScenicRegionInfoDTO> {
        return await this.scenicRegionService.createScenicRegionInfoWithLang(
            scenicRegionId,
            regionInfoInput,
            lang
        );
    }

    // @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicRegionDTO)
    async updateScenicRegion(
        @Args('id') id: string,
        @Args('regionInfoInput') regionInput: UpdateScenicRegionInput
    ): Promise<ScenicRegionDTO> {
        return await this.scenicRegionService.updateScenicRegion(
            id,
            regionInput
        );
    }

    // @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicRegionInfoDTO)
    async UpdateScenicRegionInfoInput(
        @Args('id') id: string,
        @Args('regionInfoInput') regionInfoInput: UpdateScenicRegionInfoInput
    ): Promise<ScenicRegionInfoDTO> {
        return await this.scenicRegionService.updateScenicRegionInfo(
            id,
            regionInfoInput
        );
    }

    // @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Boolean)
    async deleteScenicRegion(@Args('id') id: string): Promise<boolean> {
        return await this.scenicRegionService.deleteScenicRegion(id);
    }

    // @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Boolean)
    async deleteScenicRegionInfo(@Args('id') id: string): Promise<boolean> {
        return await this.scenicRegionService.deleteScenicRegionInfo(id);
    }

    @Query((returns) => ScenicRegionDTO)
    async scenicRegion(
        @Args('id', { type: () => String }) id: string
    ): Promise<ScenicRegionDTO> {
        return this.scenicRegionService.queryScenicRegionById(id);
    }

    @Query((returns) => ScenicRegionDTO)
    async scenicRegionByLang(
        @Args('id', { type: () => String }) id: string,
        @Args('lang') lang: Language
    ): Promise<ScenicRegionDTO> {
        return this.scenicRegionService.queryScenicRegionByLang(id, lang);
    }

    @Query((returns) => ScenicRegionConnection)
    async scenicRegions(
        @Args() args: PaginationArgs,
        @Args({
            name: 'orderBy',
            type: () => ScenicRegionOrder,
            nullable: true,
        })
        orderBy: ScenicRegionOrder
    ): Promise<ScenicRegionConnection> {
        return this.scenicRegionService.queryScenicRegions(args, orderBy);
    }

    @Query((returns) => ScenicRegionConnection)
    async scenicRegionsHasAllInfo(
        @Args() args: PaginationArgs,
        @Args({
            name: 'orderBy',
            type: () => ScenicRegionOrder,
            nullable: true,
        })
        orderBy: ScenicRegionOrder
    ): Promise<ScenicRegionConnection> {
        return this.scenicRegionService.queryScenicRegionsHasAllInfo(
            args,
            orderBy
        );
    }

    @Query((returns) => ScenicRegionInfoDTO)
    async scenicRegionInfo(
        @Args('id', { type: () => String }) id: string
    ): Promise<ScenicRegionDTO> {
        return this.scenicRegionService.queryScenicRegionById(id);
    }

    @Query((returns) => ScenicRegionInfoDTO)
    async scenicRegionInfos(
        @Args('scenicRegionId', { type: () => String }) scenicRegionId: string
    ): Promise<ScenicRegionInfoDTO[]> {
        return this.scenicRegionService.queryScenicRegionInfosByScenicRegionId(
            scenicRegionId
        );
    }
}
