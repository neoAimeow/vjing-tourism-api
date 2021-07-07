/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ScenicSpotTypeDTO,
    ScenicSpotTypeInfoDTO,
} from './../../models/scenic-spot-type.model';
import { PrismaService } from '../../services/common/prisma.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { ScenicSpotTypeService } from 'src/services/biz/scenic-spot-type.service';
import { Language } from '@prisma/client';
import {
    CreateScenicSpotTypeInfoInput,
    CreateScenicSpotTypeInput,
} from './dto/create-scenic-spot-type.input';
import {
    UpdateScenicSpotTypeInput,
    UpdateScenicSpotTypeInfoInput,
} from './dto/update-scenic-spot-type.input';

@Resolver((of) => ScenicSpotTypeDTO)
@UseGuards(GqlAuthGuard)
export class ScenicSpotTypeResolver {
    constructor(
        private prisma: PrismaService,
        private readonly scenicSpotTypeService: ScenicSpotTypeService
    ) {}

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicSpotTypeDTO)
    async createScenicSpotType(
        @Args('scenicRegionId') scenicRegionId: string,
        @Args('spotTypeInput') spotTypeInput: CreateScenicSpotTypeInput,
        @Args('spotTypeInfoInput')
        spotTypeInfoInput: CreateScenicSpotTypeInfoInput,
        @Args('lang') lang: Language
    ): Promise<ScenicSpotTypeDTO> {
        return await this.scenicSpotTypeService.createScenicSpotType(
            scenicRegionId,
            spotTypeInput,
            spotTypeInfoInput,
            lang
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicSpotTypeInfoDTO)
    async createScenicSpotTypeInfoWithLang(
        @Args('scenicSpotTypeId') scenicSpotTypeId: string,
        @Args('spotTypeInfoInput')
        spotTypeInfoInput: CreateScenicSpotTypeInfoInput,
        @Args('lang') lang: Language
    ): Promise<ScenicSpotTypeInfoDTO> {
        return await this.scenicSpotTypeService.createScenicSpotTypeInfoWithLang(
            scenicSpotTypeId,
            spotTypeInfoInput,
            lang
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicSpotTypeDTO)
    async updateScenicSpotType(
        @Args('id') id: string,
        @Args('spotTypeInfoInput') spotTypeInput: UpdateScenicSpotTypeInput
    ): Promise<ScenicSpotTypeDTO> {
        return await this.scenicSpotTypeService.updateScenicSpotType(
            id,
            spotTypeInput
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicSpotTypeInfoDTO)
    async UpdateScenicSpotTypeInfoInput(
        @Args('id') id: string,
        @Args('spotTypeInfoInput')
        spotTypeInfoInput: UpdateScenicSpotTypeInfoInput
    ): Promise<ScenicSpotTypeInfoDTO> {
        return await this.scenicSpotTypeService.updateScenicSpotTypeInfo(
            id,
            spotTypeInfoInput
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Boolean)
    async deleteScenicSpotType(@Args('id') id: string): Promise<boolean> {
        return await this.scenicSpotTypeService.deleteScenicSpotType(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Boolean)
    async deleteScenicSpotTypeInfo(@Args('id') id: string): Promise<boolean> {
        return await this.scenicSpotTypeService.deleteScenicSpotTypeInfo(id);
    }

    @Query((returns) => ScenicSpotTypeDTO)
    async scenicSpotType(
        @Args('id', { type: () => String }) id: string
    ): Promise<ScenicSpotTypeDTO> {
        return this.scenicSpotTypeService.queryScenicSpotTypeById(id);
    }

    @Query((returns) => ScenicSpotTypeDTO)
    async scenicSpotTypeByLang(
        @Args('id', { type: () => String }) id: string,
        @Args('lang') lang: Language
    ): Promise<ScenicSpotTypeDTO> {
        return this.scenicSpotTypeService.queryScenicSpotTypeByLang(id, lang);
    }

    @Query((returns) => ScenicSpotTypeInfoDTO)
    async scenicSpotTypeInfo(
        @Args('id', { type: () => String }) id: string
    ): Promise<ScenicSpotTypeDTO> {
        return this.scenicSpotTypeService.queryScenicSpotTypeById(id);
    }

    @Query((returns) => ScenicSpotTypeInfoDTO)
    async scenicSpotTypeInfos(
        @Args('scenicSpotTypeId', { type: () => String })
        scenicSpotTypeId: string
    ): Promise<ScenicSpotTypeInfoDTO[]> {
        return this.scenicSpotTypeService.queryScenicSpotTypeInfosByScenicSpotTypeId(
            scenicSpotTypeId
        );
    }
}