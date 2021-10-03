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
import { Language } from '@prisma/client';

@Injectable()
export class ScenicSpotTypeService {
    constructor(private prisma: PrismaService) {}

    /********************************************  create ScenicSpotType  *******************************************************************/

    async createScenicSpotType(
        spotTypeInput: CreateScenicSpotTypeInput,
        spotTypeInfoInput: CreateScenicSpotTypeInfoInput,
        lang?: Language
    ): Promise<ScenicSpotTypeDTO> {
        try {
            const data = await this.prisma.scenicSpotType.create({
                data: {
                    displayName: spotTypeInput.displayName,
                    icon: spotTypeInput.icon,
                },
            });
            const scenicSpotTypeInfoDto: ScenicSpotTypeInfoDTO =
                await this.createScenicSpotTypeInfoWithLang(
                    data.id,
                    spotTypeInfoInput,
                    lang || Language.CHINESE
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
            const hasDataResult = await this.prisma.scenicSpotType.findUnique({
                where: { id: scenicSpotTypeId },
            });
            if (!hasDataResult) {
                throw new BadRequestException(
                    'scenicSpotTypeId错误，不存在该分类'
                );
            }

            const hasLangResult =
                await this.prisma.scenicSpotTypeInfo.findFirst({
                    where: { scenicSpotTypeId, lang },
                });

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
                    icon: spotTypeInput.icon,
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

    queryScenicSpotTypes(): Promise<ScenicSpotTypeDTO[]> {
        return this.prisma.scenicSpotType.findMany({});
    }

    queryScenicSpotTypeInfoById(id: string): Promise<ScenicSpotTypeInfoDTO> {
        return this.prisma.scenicSpotTypeInfo.findUnique({
            where: { id },
        });
    }

    /********************************************  query ScenicSpotTypeInfo  *******************************************************************/

    queryScenicSpotTypeById(id: string): Promise<ScenicSpotTypeDTO> {
        return this.prisma.scenicSpotType.findUnique({ where: { id } });
    }

    async queryScenicSpotTypeInfosByScenicSpotTypeId(
        scenicSpotTypeId: string
    ): Promise<ScenicSpotTypeInfoDTO[]> {
        const result: ScenicSpotTypeInfoDTO[] = [];
        const array = await this.prisma.scenicSpotTypeInfo.findMany({
            where: { scenicSpotTypeId },
        });
        array.forEach((element) => {
            const data: ScenicSpotTypeInfoDTO = { ...element };
            result.push(data);
        });
        return result;
    }
}
