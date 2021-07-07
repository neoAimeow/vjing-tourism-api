import {
    UpdateScenicSpotTypeInfoInput,
    UpdateScenicSpotTypeInput,
} from './../../resolvers/scenic-spot-type/dto/update-scenic-spot-type.input';
import {
    CreateScenicSpotTypeInfoInput,
    CreateScenicSpotTypeInput,
} from './../../resolvers/scenic-spot-type/dto/create-scenic-spot-type.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
    ScenicSpotTypeDTO,
    ScenicSpotTypeInfoDTO,
} from 'src/models/scenic-spot-type.model';
import { Language, ScenicSpotType, ScenicSpotTypeInfo } from '@prisma/client';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Injectable()
export class ScenicSpotTypeService {
    constructor(private prisma: PrismaService) {}

    /********************************************  create ScenicSpotType  *******************************************************************/

    async createScenicSpotType(
        scenicRegionId: string,
        spotTypeInput: CreateScenicSpotTypeInput,
        spotTypeInfoInput: CreateScenicSpotTypeInfoInput,
        lang: Language
    ): Promise<ScenicSpotTypeDTO> {
        try {
            const data = await this.prisma.scenicSpotType.create({
                data: {
                    scenicRegionId,
                    displayName: spotTypeInput.displayName,
                    rank: spotTypeInput.rank || 0,
                },
            });
            const scenicSpotTypeInfoDto: ScenicSpotTypeInfoDTO =
                await this.createScenicSpotTypeInfoWithLang(
                    data.id,
                    spotTypeInfoInput,
                    lang
                );

            return {
                ...data,
                scenicSpotTypeInfoDtos: [scenicSpotTypeInfoDto],
            };
        } catch (ex) {
            return null;
        }
    }

    async createScenicSpotTypeInfoWithLang(
        scenicSpotTypeId: string,
        input: CreateScenicSpotTypeInfoInput,
        lang: Language
    ): Promise<ScenicSpotTypeInfoDTO> {
        try {
            const hasDataResult = await this.getScenicSpotTypeById(
                scenicSpotTypeId
            );
            if (!hasDataResult) {
                throw new BadRequestException(
                    'scenicSpotTypeId错误，不存在该分类'
                );
            }

            const hasLangResult = await this.getScenicSpotTypeInfoByIdAndLang(
                scenicSpotTypeId,
                lang
            );
            if (hasLangResult) {
                throw new BadRequestException('该分类已经存在这个语言的信息');
            }

            const data = await this.prisma.scenicSpotTypeInfo.create({
                data: {
                    scenicSpotTypeId,
                    name: input.name,
                },
            });

            //如果该语种不存在就创建国际化数据。
            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    /********************************************  update ScenicSpotType  *******************************************************************/

    async updateScenicSpotType(
        id: string,
        spotTypeInput: UpdateScenicSpotTypeInput
    ): Promise<ScenicSpotTypeDTO> {
        try {
            const data = await this.prisma.scenicSpotType.update({
                where: { id },
                data: {
                    displayName: spotTypeInput.displayName,
                    rank: spotTypeInput.rank || 0,
                },
            });

            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    async updateScenicSpotTypeInfo(
        id: string,
        SpotTypeInput: UpdateScenicSpotTypeInfoInput
    ): Promise<ScenicSpotTypeInfoDTO> {
        try {
            const data = await this.prisma.scenicSpotTypeInfo.update({
                where: { id },
                data: {
                    name: SpotTypeInput.name,
                },
            });

            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    /********************************************  delete ScenicSpotType  *******************************************************************/

    async deleteScenicSpotType(id: string): Promise<boolean> {
        try {
            const deleteFather = this.prisma.scenicSpotType.delete({
                where: { id },
            });
            const deleteChildren = this.prisma.scenicSpotTypeInfo.deleteMany({
                where: { scenicSpotTypeId: id },
            });
            //add transaction，avoid delete failed
            const result = await this.prisma.$transaction([
                deleteFather,
                deleteChildren,
            ]);
            return result === null;
        } catch (ex) {
            return null;
        }
    }

    async deleteScenicSpotTypeInfo(id: string): Promise<boolean> {
        try {
            const result = await this.prisma.scenicSpotTypeInfo.delete({
                where: { id },
            });
            return result === null;
        } catch (ex) {
            return null;
        }
    }

    /********************************************  query ScenicSpotType  *******************************************************************/

    async queryScenicSpotTypeInfoById(
        id: string
    ): Promise<ScenicSpotTypeInfoDTO> {
        return { ...(await this.getScenicSpotTypeInfoById(id)) };
    }

    async queryScenicSpotTypeByLang(
        id: string,
        lang: Language
    ): Promise<ScenicSpotTypeDTO> {
        const info: ScenicSpotTypeInfo =
            await this.getScenicSpotTypeInfoByIdAndLang(id, lang);
        if (!info) {
            throw new BadRequestException('没有查询到该景点详情');
        }

        const base: ScenicSpotType = await this.getScenicSpotTypeById(id);
        if (!base) {
            throw new BadRequestException('没有查询到该景点');
        }
        return this.combineScenicSpotType(base, [info]);
    }

    /********************************************  query ScenicSpotTypeInfo  *******************************************************************/

    async queryScenicSpotTypeById(id: string): Promise<ScenicSpotTypeDTO> {
        const infos = await this.getScenicSpotTypeInfosByScenicSpotTypeId(id);
        const base = await this.getScenicSpotTypeById(id);
        if (!base) {
            throw new BadRequestException('没有查询到该景点');
        }
        return this.combineScenicSpotType(base, infos);
    }

    async queryScenicSpotTypeInfosByScenicSpotTypeId(
        scenicSpotTypeId: string
    ): Promise<ScenicSpotTypeInfoDTO[]> {
        const result: ScenicSpotTypeInfoDTO[] = [];
        const array = await this.getScenicSpotTypeInfosByScenicSpotTypeId(
            scenicSpotTypeId
        );
        array.forEach((element) => {
            const data: ScenicSpotTypeInfoDTO = { ...element };
            result.push(data);
        });
        return result;
    }

    async queryScenicSpotTypeInfoByScenicSpotTypeIdAndLang(
        scenicSpotTypeId: string,
        lang: Language
    ): Promise<ScenicSpotTypeInfoDTO> {
        return {
            ...(await this.getScenicSpotTypeInfoByIdAndLang(
                scenicSpotTypeId,
                lang
            )),
        };
    }

    /********************************************  private methods  *******************************************************************/

    private async getScenicSpotTypeById(id: string): Promise<ScenicSpotType> {
        return this.prisma.scenicSpotType.findUnique({ where: { id } });
    }

    private getScenicSpotTypeInfoById(id: string): Promise<ScenicSpotTypeInfo> {
        return this.prisma.scenicSpotTypeInfo.findUnique({
            where: { id },
        });
    }

    private getScenicSpotTypeInfosByScenicSpotTypeId(
        scenicSpotTypeId: string
    ): Promise<ScenicSpotTypeInfo[]> {
        return this.prisma.scenicSpotTypeInfo.findMany({
            where: { scenicSpotTypeId },
        });
    }

    private getScenicSpotTypeInfoByIdAndLang(
        scenicSpotTypeId: string,
        lang: Language
    ): Promise<ScenicSpotTypeInfo> {
        return this.prisma.scenicSpotTypeInfo.findFirst({
            where: { scenicSpotTypeId, lang },
        });
    }

    private combineScenicSpotType(
        base: ScenicSpotType,
        scenicSpotTypeInfos: ScenicSpotTypeInfo[]
    ): ScenicSpotTypeDTO {
        const scenicSpotTypeInfoDtos: ScenicSpotTypeInfoDTO[] = [];

        scenicSpotTypeInfos.forEach((item) => {
            scenicSpotTypeInfoDtos.push({ ...item });
        });
        const data: ScenicSpotTypeDTO = { ...base, scenicSpotTypeInfoDtos };
        return data;
    }
}
