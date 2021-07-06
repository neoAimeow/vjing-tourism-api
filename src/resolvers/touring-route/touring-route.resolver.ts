import {
    TouringRouteDTO,
    TouringRouteInfoDTO,
} from './../../models/touring-route.model';
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
import { UseGuards } from '@nestjs/common';
import { Language } from '@prisma/client';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import {
    CreateTouringRouteInput,
    CreateTouringRouteInfoInput,
} from './dto/create-touring-route.input';
import {
    UpdateTouringRouteInput,
    UpdateTouringRouteInfoInput,
} from './dto/update-touring-route.input';
import { TouringRouteService } from 'src/services/biz/touring-route.service';

@Resolver((of) => TouringRouteDTO)
@UseGuards(GqlAuthGuard)
export class TouringRouteResolver {
    constructor(
        private prisma: PrismaService,
        private readonly touringRouteService: TouringRouteService
    ) {}

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => TouringRouteDTO)
    async createTouringRoute(
        @Args('scenicRegionId') scenicRegionId: string,
        @Args('input') input: CreateTouringRouteInput,
        @Args('infoInput')
        infoInput: CreateTouringRouteInfoInput,
        @Args('lang') lang: Language
    ): Promise<TouringRouteDTO> {
        return await this.touringRouteService.createTouringRoute(
            scenicRegionId,
            input,
            infoInput,
            lang
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => TouringRouteInfoDTO)
    async createTouringRouteInfoWithLang(
        @Args('touringRouteId') touringRouteId: string,
        @Args('input')
        input: CreateTouringRouteInfoInput,
        @Args('lang') lang: Language
    ): Promise<TouringRouteInfoDTO> {
        return await this.touringRouteService.createTouringRouteInfoWithLang(
            touringRouteId,
            input,
            lang
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => TouringRouteDTO)
    async updateTouringRoute(
        @Args('id') id: string,
        @Args('input') input: UpdateTouringRouteInput
    ): Promise<TouringRouteDTO> {
        return await this.touringRouteService.updateTouringRoute(id, input);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => TouringRouteInfoDTO)
    async UpdateTouringRouteInfoInput(
        @Args('id') id: string,
        @Args('infoInput')
        infoInput: UpdateTouringRouteInfoInput
    ): Promise<TouringRouteInfoDTO> {
        return await this.touringRouteService.updateTouringRouteInfo(
            id,
            infoInput
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Boolean)
    async deleteTouringRoute(@Args('id') id: string): Promise<boolean> {
        return await this.touringRouteService.deleteTouringRoute(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Boolean)
    async deleteTouringRouteInfo(@Args('id') id: string): Promise<boolean> {
        return await this.touringRouteService.deleteTouringRouteInfo(id);
    }

    @Query((returns) => TouringRouteDTO)
    async TouringRoute(
        @Args('id', { type: () => String }) id: string
    ): Promise<TouringRouteDTO> {
        return this.touringRouteService.queryTouringRouteById(id);
    }

    @Query((returns) => TouringRouteDTO)
    async TouringRouteByLang(
        @Args('id', { type: () => String }) id: string,
        @Args('lang') lang: Language
    ): Promise<TouringRouteDTO> {
        return this.touringRouteService.queryTouringRouteByLang(id, lang);
    }

    @Query((returns) => TouringRouteInfoDTO)
    async TouringRouteInfo(
        @Args('id', { type: () => String }) id: string
    ): Promise<TouringRouteDTO> {
        return this.touringRouteService.queryTouringRouteById(id);
    }

    @Query((returns) => TouringRouteInfoDTO)
    async TouringRouteInfos(
        @Args('TouringRouteId', { type: () => String })
        TouringRouteId: string
    ): Promise<TouringRouteInfoDTO[]> {
        return this.touringRouteService.queryTouringRouteInfosByTouringRouteId(
            TouringRouteId
        );
    }
}
