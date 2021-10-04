/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ScenicSpotTypeDTO,
    ScenicSpotTypeInfoDTO,
} from './../../models/scenic-spot-type.model';
import { PrismaService } from '../../services/common/prisma.service';
import {
    Resolver,
    Query,
    Args,
    Mutation,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
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
// @UseGuards(GqlAuthGuard)
export class ScenicSpotTypeResolver {
    constructor(
        private prisma: PrismaService,
        private readonly scenicSpotTypeService: ScenicSpotTypeService
    ) {}

    // @UseGuards(GqlAuthGuard)
    @Mutation((returns) => ScenicSpotTypeDTO)
    async createScenicSpotType(
        @Args('spotTypeInput') spotTypeInput: CreateScenicSpotTypeInput,
        @Args('spotTypeInfoInput')
        spotTypeInfoInput: CreateScenicSpotTypeInfoInput,
        @Args({ name: 'lang', nullable: true }) lang?: Language
    ): Promise<ScenicSpotTypeDTO> {
        return await this.scenicSpotTypeService.createScenicSpotType(
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
    async updateScenicSpotTypeInfo(
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

    @Query((returns) => [ScenicSpotTypeDTO])
    async scenicSpotTypes(): Promise<ScenicSpotTypeDTO[]> {
        const data = await this.scenicSpotTypeService.queryScenicSpotTypes();
        console.error(123123123123123, data);
        return data;
    }

    @Query((returns) => ScenicSpotTypeDTO)
    async scenicSpotType(
        @Args('id', { type: () => String }) id: string
    ): Promise<ScenicSpotTypeDTO> {
        return this.scenicSpotTypeService.queryScenicSpotTypeById(id);
    }

    @Query((returns) => ScenicSpotTypeInfoDTO)
    async scenicSpotTypeInfo(
        @Args('id', { type: () => String }) id: string
    ): Promise<ScenicSpotTypeDTO> {
        return this.scenicSpotTypeService.queryScenicSpotTypeById(id);
    }

    @ResolveField('scenicSpotTypeInfoDtos', (returns) => [
        ScenicSpotTypeInfoDTO,
    ])
    async getScenicSpotInfos(@Parent() scenicSpotType: ScenicSpotTypeDTO) {
        const { id } = scenicSpotType;
        return this.scenicSpotTypeService.queryScenicSpotTypeInfosByScenicSpotTypeId(
            id
        );
    }
}
