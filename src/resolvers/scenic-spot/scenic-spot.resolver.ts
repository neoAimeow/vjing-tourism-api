import { ScenicSpotDTO } from './../../models/scenic-spot.model';
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
        @Args('input') regionInput: CreateScenicSpotInput,
        @Args('infoInput') regionInfoInput: CreateScenicSpotInfoInput,
        @Args('lang') lang: Language
    ): Promise<ScenicSpotDTO> {
        return await this.scenicSpotService.createScenicSpot(
            scenicRegionId,
            scenicSpotTypeId,
            regionInput,
            regionInfoInput,
            lang
        );
    }
}
