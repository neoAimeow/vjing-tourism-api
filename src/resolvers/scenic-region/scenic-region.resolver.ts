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

@Resolver((of) => ScenicRegionDTO)
// @UseGuards(GqlAuthGuard)
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
        @Args() { skip, after, before, first, last }: PaginationArgs,
        @Args({ name: 'query', type: () => String, nullable: true })
        query: string,
        @Args({
            name: 'orderBy',
            type: () => ScenicRegionOrder,
            nullable: true,
        })
        orderBy: ScenicRegionOrder
    ): Promise<ScenicRegionDTO> {
        return null;
        // return this.scenicRegionService.queryScenicRegionById(id);
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

    // @ResolveField()
    // async scenicRegions(@Parent() scenicRegion: ScenicRegionDTO) {
    //     const { id } = scenicRegion;
    //     return this.scenicRegionService.queryScenicRegions(id);
    // }
}
