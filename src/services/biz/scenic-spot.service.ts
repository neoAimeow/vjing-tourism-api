import {
    ScenicSpotDTO,
    ScenicSpotInfoDTO,
} from './../../models/scenic-spot.model';
import { Language, ScenicSpot, ScenicSpotInfo } from '@prisma/client';
import {
    CreateScenicSpotInput,
    CreateScenicSpotInfoInput,
} from './../../resolvers/scenic-spot/dto/create-scenic-spot.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
    UpdateScenicSpotInfoInput,
    UpdateScenicSpotInput,
} from 'src/resolvers/scenic-spot/dto/update-scenic-spot.input';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import {
    ScenicSpotOrder,
    ScenicSpotOrderField,
} from 'src/models/inputs/scenic-spot-order.input';
import { ScenicSpotConnection } from 'src/models/pagination/scenic-spot-connection.model';
import { OrderDirection } from 'src/common/order/order-direction';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Injectable()
export class ScenicSpotService {
    constructor(private prisma: PrismaService) {}

    async createScenicSpot(
        scenicRegionId: string,
        scenicSpotTypeId: string,
        input: CreateScenicSpotInput,
        infoInput: CreateScenicSpotInfoInput,
        lang: Language
    ): Promise<ScenicSpotDTO> {
        try {
            const data = await this.prisma.scenicSpot.create({
                data: {
                    displayName: input.displayName,
                    scenicRegionId,
                    scenicSpotTypeId,
                    hidden: input.hidden || false,
                },
            });
            const scenicRegionInfoDto: ScenicSpotInfoDTO =
                await this.createScenicSpotInfoWithLang(
                    data.id,
                    infoInput,
                    lang
                );

            return {
                ...data,
                scenicSpotInfoDtos: [scenicRegionInfoDto],
            };
        } catch (ex) {
            return null;
        }
    }

    async createScenicSpotInfoWithLang(
        scenicSpotId: string,
        input: CreateScenicSpotInfoInput,
        lang: Language
    ): Promise<ScenicSpotInfoDTO> {
        try {
            const hasDataResult = await this.getScenicSpotById(scenicSpotId);
            if (!hasDataResult) {
                throw new BadRequestException('scenicSpotId错误，不存在该景点');
            }

            const hasLangResult = await this.getScenicSpotInfoByIdAndLang(
                scenicSpotId,
                lang
            );
            if (hasLangResult) {
                throw new BadRequestException('该景点已经存在这个语言的信息');
            }

            const data = await this.prisma.scenicSpotInfo.create({
                data: {
                    scenicSpotId: input.scenicSpotId,
                    name: input.name,
                    introduction: input.introduction || '',
                    iconUri: input.iconUri || '',
                    audioUri: input.audioUri || '',
                    imageUri: input.imageUri || '',
                    lang: lang || Language.CHINESE,
                },
            });

            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    /********************************************  update ScenicSpot  *******************************************************************/

    async updateScenicSpot(
        id: string,
        scenicSpotTypeId: string,
        spotInput: UpdateScenicSpotInput
    ): Promise<ScenicSpotDTO> {
        try {
            const data = await this.prisma.scenicSpot.update({
                where: { id },
                data: {
                    displayName: spotInput.displayName,
                    scenicSpotTypeId,
                    hidden: spotInput.hidden || false,
                },
            });

            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    async updateScenicSpotInfo(
        id: string,
        input: UpdateScenicSpotInfoInput
    ): Promise<ScenicSpotInfoDTO> {
        try {
            const data = await this.prisma.scenicSpotInfo.update({
                where: { id },
                data: {
                    scenicSpotId: input.scenicSpotId,
                    name: input.name,
                    introduction: input.introduction || '',
                    iconUri: input.iconUri || '',
                    audioUri: input.audioUri || '',
                    imageUri: input.imageUri || '',
                },
            });

            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    /********************************************  delete ScenicSpot  *******************************************************************/

    async deleteScenicSpot(id: string): Promise<boolean> {
        try {
            const deleteFather = this.prisma.scenicSpot.delete({
                where: { id },
            });
            const deleteChildren = this.prisma.scenicSpotInfo.deleteMany({
                where: { scenicSpotId: id },
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

    async deleteScenicSpotInfo(id: string): Promise<boolean> {
        try {
            const result = await this.prisma.scenicSpotInfo.delete({
                where: { id },
            });
            return result === null;
        } catch (ex) {
            return null;
        }
    }

    /********************************************  query ScenicSpot  *******************************************************************/

    async queryScenicSpotInfoById(id: string): Promise<ScenicSpotInfoDTO> {
        return { ...(await this.getScenicSpotInfoById(id)) };
    }

    async queryScenicSpotByLang(
        id: string,
        lang: Language
    ): Promise<ScenicSpotDTO> {
        const info: ScenicSpotInfo = await this.getScenicSpotInfoByIdAndLang(
            id,
            lang
        );
        if (!info) {
            throw new BadRequestException('没有查询到该景点详情');
        }

        const base: ScenicSpot = await this.getScenicSpotById(id);
        if (!base) {
            throw new BadRequestException('没有查询到该景点');
        }
        return this.combineScenicSpot(base, [info]);
    }

    async queryScenicSpots(
        { skip, after, before, first, last }: PaginationArgs,
        orderBy: ScenicSpotOrder
    ): Promise<ScenicSpotConnection> {
        const orderByDefault: ScenicSpotOrder = {
            field: ScenicSpotOrderField.createdAt,
            direction: OrderDirection.asc,
        };

        const a = await findManyCursorConnection(
            (args) =>
                this.prisma.scenicSpot.findMany({
                    orderBy: orderBy
                        ? { [orderBy.field]: orderBy.direction }
                        : { [orderByDefault.field]: orderByDefault.direction },
                    ...args,
                }),
            () => this.prisma.scenicSpot.count(),
            { first, last, before, after }
        );
        return a;
    }

    async queryScenicSpotsHasAllInfo(
        args: PaginationArgs,
        orderBy: ScenicSpotOrder
    ): Promise<ScenicSpotConnection> {
        const scenicSpotConnection: ScenicSpotConnection =
            await this.queryScenicSpots(args, orderBy);
        const { edges } = scenicSpotConnection || {};
        await Promise.all(
            edges.map(async (item) => {
                const { node } = item;
                const { id } = node;
                const arrays: ScenicSpotInfoDTO[] =
                    await this.queryScenicSpotInfosByScenicSpotId(id);
                node.scenicSpotInfoDtos = arrays;
            })
        );
        return scenicSpotConnection;
    }

    /********************************************  query ScenicSpotInfo  *******************************************************************/

    async queryScenicSpotById(id: string): Promise<ScenicSpotDTO> {
        const infos = await this.getScenicSpotInfosByScenicSpotId(id);
        const base = await this.getScenicSpotById(id);
        if (!base) {
            throw new BadRequestException('没有查询到该景点');
        }
        return this.combineScenicSpot(base, infos);
    }

    async queryScenicSpotInfosByScenicSpotId(
        scenicSpotId: string
    ): Promise<ScenicSpotInfoDTO[]> {
        const result: ScenicSpotInfoDTO[] = [];
        const array = await this.getScenicSpotInfosByScenicSpotId(scenicSpotId);
        array.forEach((element) => {
            const data: ScenicSpotInfoDTO = { ...element };
            result.push(data);
        });
        return result;
    }

    async queryScenicSpotInfoByScenicSpotIdAndLang(
        scenicSpotId: string,
        lang: Language
    ): Promise<ScenicSpotInfoDTO> {
        return {
            ...(await this.getScenicSpotInfoByIdAndLang(scenicSpotId, lang)),
        };
    }

    /********************************************  private methods  *******************************************************************/

    private async getScenicSpotById(id: string): Promise<ScenicSpot> {
        return this.prisma.scenicSpot.findUnique({ where: { id } });
    }

    private getScenicSpotInfoById(id: string): Promise<ScenicSpotInfo> {
        return this.prisma.scenicSpotInfo.findUnique({
            where: { id },
        });
    }

    private getScenicSpotInfosByScenicSpotId(
        scenicSpotId: string
    ): Promise<ScenicSpotInfo[]> {
        return this.prisma.scenicSpotInfo.findMany({
            where: { scenicSpotId },
        });
    }

    private getScenicSpotInfoByIdAndLang(
        scenicSpotId: string,
        lang: Language
    ): Promise<ScenicSpotInfo> {
        return this.prisma.scenicSpotInfo.findFirst({
            where: { scenicSpotId, lang },
        });
    }

    private combineScenicSpot(
        base: ScenicSpot,
        scenicSpotInfos: ScenicSpotInfo[]
    ): ScenicSpotDTO {
        const scenicSpotInfoDtos: ScenicSpotInfoDTO[] = [];

        scenicSpotInfos.forEach((item) => {
            scenicSpotInfoDtos.push({ ...item });
        });
        const data: ScenicSpotDTO = { ...base, scenicSpotInfoDtos };
        return data;
    }
}
