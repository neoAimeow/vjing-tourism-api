import {
    ScenicSpotDTO,
    ScenicSpotInfoDTO,
} from './../../models/scenic-spot.model';
import { PrismaService } from '../../services/common/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import {
    Resolver,
    Query,
    Parent,
    Args,
    ResolveField,
    Mutation,
} from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import {
    CreateScenicSpotInfoInput,
    CreateScenicSpotInput,
} from './dto/create-scenic-spot.input';
import { Language } from '@prisma/client';
import { ScenicSpotService } from 'src/services/biz/scenic-spot.service';
import {
    UpdateScenicSpotInfoInput,
    UpdateScenicSpotInput,
} from './dto/update-scenic-spot.input';
import { ScenicSpotConnection } from 'src/models/pagination/scenic-spot-connection.model';
import { ScenicSpotOrder } from 'src/models/inputs/scenic-spot-order.input';

@Resolver((of) => ScenicSpotDTO)
@UseGuards(GqlAuthGuard)
export class ScenicSpotResolver {
    constructor(
        private prisma: PrismaService,
        private readonly scenicSpotService: ScenicSpotService
    ) {}

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicSpotDTO)
    async createScenicSpot(
        @Args('scenicRegionId') scenicRegionId: string,
        @Args('scenicSpotTypeId') scenicSpotTypeId: string,
        @Args('input') SpotInput: CreateScenicSpotInput,
        @Args('infoInput') SpotInfoInput: CreateScenicSpotInfoInput,
        @Args('lang') lang: Language
    ): Promise<ScenicSpotDTO> {
        return this.scenicSpotService.createScenicSpot(
            scenicRegionId,
            scenicSpotTypeId,
            SpotInput,
            SpotInfoInput,
            lang
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicSpotInfoDTO)
    async createScenicSpotInfoWithLang(
        @Args('scenicSpotId') scenicSpotId: string,
        @Args('spotInfoInput') spotInfoInput: CreateScenicSpotInfoInput,
        @Args('lang') lang: Language
    ): Promise<ScenicSpotInfoDTO> {
        return await this.scenicSpotService.createScenicSpotInfoWithLang(
            scenicSpotId,
            spotInfoInput,
            lang
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicSpotDTO)
    async updateScenicSpot(
        @Args('id') id: string,
        @Args('scenicSpotTypeId') scenicSpotTypeId: string,
        @Args('spotInfoInput') spotInput: UpdateScenicSpotInput
    ): Promise<ScenicSpotDTO> {
        return await this.scenicSpotService.updateScenicSpot(
            id,
            scenicSpotTypeId,
            spotInput
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicSpotInfoDTO)
    async UpdateScenicSpotInfoInput(
        @Args('id') id: string,
        @Args('spotInfoInput') spotInfoInput: UpdateScenicSpotInfoInput
    ): Promise<ScenicSpotInfoDTO> {
        return await this.scenicSpotService.updateScenicSpotInfo(
            id,
            spotInfoInput
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Boolean)
    async deleteScenicSpot(@Args('id') id: string): Promise<boolean> {
        return await this.scenicSpotService.deleteScenicSpot(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Boolean)
    async deleteScenicSpotInfo(@Args('id') id: string): Promise<boolean> {
        return await this.scenicSpotService.deleteScenicSpotInfo(id);
    }

    @Query((returns) => ScenicSpotDTO)
    async scenicSpot(
        @Args('id', { type: () => String }) id: string
    ): Promise<ScenicSpotDTO> {
        return this.scenicSpotService.queryScenicSpotById(id);
    }

    @Query((returns) => ScenicSpotConnection)
    async scenicSpots(
        @Args('scenicRegionId', { type: () => String }) scenicRegionId: string,
        @Args() args: PaginationArgs,
        @Args({
            name: 'orderBy',
            type: () => ScenicSpotOrder,
            nullable: true,
        })
        orderBy: ScenicSpotOrder
    ): Promise<ScenicSpotConnection> {
        return this.scenicSpotService.queryScenicSpots(
            scenicRegionId,
            args,
            orderBy
        );
    }

    @Query((returns) => ScenicSpotInfoDTO)
    async scenicSpotInfo(
        @Args('id', { type: () => String }) id: string
    ): Promise<ScenicSpotInfoDTO> {
        return this.scenicSpotService.queryScenicSpotInfoById(id);
    }

    @ResolveField('scenicSpotInfoDtos', (returns) => [ScenicSpotInfoDTO])
    async getScenicSpotInfos(@Parent() scenicSpot: ScenicSpotDTO) {
        const { id } = scenicSpot;
        return this.scenicSpotService.queryScenicSpotInfosByScenicSpotId(id);
    }
}
