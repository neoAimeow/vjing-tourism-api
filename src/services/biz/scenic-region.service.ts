import { ScenicRegionConnection } from './../../models/pagination/scenic-region-connection.model';
import {
    CreateScenicRegionInput,
    CreateScenicRegionInfoInput,
} from './../../resolvers/scenic-region/dto/create-scenic-region.input';
import {
    Injectable,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Language, ScenicRegion, ScenicRegionInfo } from '@prisma/client';
import {
    ScenicRegionDTO,
    ScenicRegionInfoDTO,
} from 'src/models/scenic-region.model';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import {
    ScenicRegionOrder,
    ScenicRegionOrderField,
} from 'src/models/inputs/scenic-region-order.input';
import { OrderDirection } from 'src/common/order/order-direction';
import {
    UpdateScenicRegionInfoInput,
    UpdateScenicRegionInput,
} from 'src/resolvers/scenic-region/dto/update-scenic-region.input';

@Injectable()
export class ScenicRegionService {
    constructor(private prisma: PrismaService) {}

    /********************************************  create ScenicRegion  *******************************************************************/

    async createScenicRegion(
        regionInput: CreateScenicRegionInput,
        regionInfoInput: CreateScenicRegionInfoInput,
        lang: Language
    ): Promise<ScenicRegionDTO> {
        try {
            const data = await this.prisma.scenicRegion.create({
                data: {
                    displayName: regionInput.displayName,
                    zoom: regionInput.zoom || 10,
                    minZoom: regionInput.minZoom || 5,
                    maxZoom: regionInput.maxZoom || 15,
                    locationLat: regionInput.locationLat || 0,
                    locationLng: regionInput.locationLng || 0,
                    handDrawingNELat: regionInput.handDrawingNELat || 0,
                    handDrawingNELng: regionInput.handDrawingNELng || 0,
                    handDrawingSWLat: regionInput.handDrawingSWLat || 0,
                    handDrawingSWLng: regionInput.handDrawingSWLng || 0,
                    enableNavigation: regionInput.enableNavigation || false,
                    enablePoiLanguageSwitch:
                        regionInput.enablePoiLanguageSwitch || false,
                    sliceState: regionInput.sliceState,
                },
            });
            const scenicRegionInfoDto: ScenicRegionInfoDTO =
                await this.createScenicRegionInfoWithLang(
                    data.id,
                    regionInfoInput,
                    lang
                );

            return {
                ...data,
                scenicRegionInfoDtos: [scenicRegionInfoDto],
            };
        } catch (ex) {
            throw new ConflictException(ex);
        }
    }

    async createScenicRegionInfoWithLang(
        scenicRegionId: string,
        input: CreateScenicRegionInfoInput,
        lang: Language
    ): Promise<ScenicRegionInfoDTO> {
        try {
            const hasDataResult = await this.getScenicRegionById(
                scenicRegionId
            );
            if (!hasDataResult) {
                throw new BadRequestException(
                    'scenicRegionId错误，不存在该景区'
                );
            }

            const hasLangResult = await this.getScenicRegionInfoByIdAndLang(
                scenicRegionId,
                lang
            );
            if (hasLangResult) {
                throw new BadRequestException('该景区已经存在这个语言的信息');
            }

            const data = await this.prisma.scenicRegionInfo.create({
                data: {
                    scenicRegionId: scenicRegionId,
                    name: input.name,
                    handDrawingUri: input.handDrawingUri || '',

                    vrUrl: input.vrUrl || '',
                    ticketUrl: input.ticketUrl || '',
                    title: input.title || '',
                    layer: input.layer || '',
                    layersDisplayName: input.layerDisplayName || '',
                    lang: lang,
                },
            });

            //如果该语种不存在就创建国际化数据。
            return { ...data };
        } catch (ex) {
            throw new ConflictException(ex);
        }
    }

    /********************************************  update ScenicRegion  *******************************************************************/

    async updateScenicRegion(
        id: string,
        regionInput: UpdateScenicRegionInput
    ): Promise<ScenicRegionDTO> {
        try {
            const data = await this.prisma.scenicRegion.update({
                where: { id },
                data: {
                    displayName: regionInput.displayName,
                    locationLat: regionInput.locationLat || 0,
                    locationLng: regionInput.locationLng || 0,
                    handDrawingNELat: regionInput.handDrawingNELat || 0,
                    handDrawingNELng: regionInput.handDrawingNELng || 0,
                    handDrawingSWLat: regionInput.handDrawingSWLat || 0,
                    handDrawingSWLng: regionInput.handDrawingSWLng || 0,
                    zoom: regionInput.zoom || 10,
                    minZoom: regionInput.minZoom || 5,
                    maxZoom: regionInput.maxZoom || 15,
                    enableNavigation: regionInput.enableNavigation || false,
                    enablePoiLanguageSwitch:
                        regionInput.enablePoiLanguageSwitch || false,
                    sliceState: regionInput.sliceState,
                },
            });

            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    async updateScenicRegionInfo(
        id: string,
        regionInput: UpdateScenicRegionInfoInput
    ): Promise<ScenicRegionInfoDTO> {
        try {
            const data = await this.prisma.scenicRegionInfo.update({
                where: { id },
                data: {
                    name: regionInput.name,
                    handDrawingUri: regionInput.handDrawingUri || '',
                    vrUrl: regionInput.vrUrl || '',
                    ticketUrl: regionInput.ticketUrl || '',
                    title: regionInput.title || '',
                    layer: regionInput.layer || '',
                    layersDisplayName: regionInput.layerDisplayName || '',
                },
            });

            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    /********************************************  delete ScenicRegion  *******************************************************************/

    async deleteScenicRegion(id: string): Promise<boolean> {
        try {
            const deleteFather = this.prisma.scenicRegion.delete({
                where: { id },
            });
            const deleteChildren = this.prisma.scenicRegionInfo.deleteMany({
                where: { scenicRegionId: id },
            });
            //add transaction，avoid delete failed
            const result = await this.prisma.$transaction([
                deleteChildren,
                deleteFather,
            ]);
            return result !== null;
        } catch (ex) {
            console.warn(ex);
            throw new ConflictException(ex);
        }
    }

    async deleteScenicRegionInfo(id: string): Promise<boolean> {
        try {
            const result = await this.prisma.scenicRegionInfo.delete({
                where: { id },
            });
            return result === null;
        } catch (ex) {
            throw new ConflictException(ex);
        }
    }

    /********************************************  query ScenicRegion  *******************************************************************/

    async queryScenicRegionInfoById(id: string): Promise<ScenicRegionInfoDTO> {
        return { ...(await this.getScenicRegionInfoById(id)) };
    }

    async queryScenicRegionByLang(
        id: string,
        lang: Language
    ): Promise<ScenicRegionDTO> {
        const info: ScenicRegionInfo =
            await this.getScenicRegionInfoByIdAndLang(id, lang);
        if (!info) {
            throw new BadRequestException('没有查询到该景点详情');
        }

        const base: ScenicRegion = await this.getScenicRegionById(id);
        if (!base) {
            throw new BadRequestException('没有查询到该景点');
        }
        return this.combineScenicRegion(base, [info]);
    }

    async queryScenicRegions(
        { after, before, first, last }: PaginationArgs,
        orderBy: ScenicRegionOrder
    ): Promise<ScenicRegionConnection> {
        const orderByDefault: ScenicRegionOrder = {
            field: ScenicRegionOrderField.createdAt,
            direction: OrderDirection.asc,
        };

        const a = await findManyCursorConnection(
            (args) =>
                this.prisma.scenicRegion.findMany({
                    orderBy: orderBy
                        ? { [orderBy.field]: orderBy.direction }
                        : { [orderByDefault.field]: orderByDefault.direction },
                    ...args,
                }),
            () => this.prisma.scenicRegion.count(),
            { first, last, before, after }
        );
        return a;
    }

    async queryScenicRegionsHasAllInfo(
        args: PaginationArgs,
        orderBy: ScenicRegionOrder
    ): Promise<ScenicRegionConnection> {
        const scenicRegionConnection: ScenicRegionConnection =
            await this.queryScenicRegions(args, orderBy);
        const { edges } = scenicRegionConnection || {};
        await Promise.all(
            edges.map(async (item) => {
                const { node } = item;
                const { id } = node;
                const arrays: ScenicRegionInfoDTO[] =
                    await this.queryScenicRegionInfosByScenicRegionId(id);
                node.scenicRegionInfoDtos = arrays;
            })
        );
        return scenicRegionConnection;
    }

    /********************************************  query ScenicRegionInfo  *******************************************************************/

    async queryScenicRegionById(id: string): Promise<ScenicRegionDTO> {
        const infos = await this.getScenicRegionInfosByScenicRegionId(id);
        const base = await this.getScenicRegionById(id);
        if (!base) {
            throw new BadRequestException('没有查询到该景点');
        }
        return this.combineScenicRegion(base, infos);
    }

    async queryScenicRegionInfosByScenicRegionId(
        scenicRegionId: string
    ): Promise<ScenicRegionInfoDTO[]> {
        const result: ScenicRegionInfoDTO[] = [];
        const array = await this.getScenicRegionInfosByScenicRegionId(
            scenicRegionId
        );
        array.forEach((element) => {
            const data: ScenicRegionInfoDTO = { ...element };
            result.push(data);
        });
        return result;
    }

    async queryScenicRegionInfoByScenicRegionIdAndLang(
        scenicRegionId: string,
        lang: Language
    ): Promise<ScenicRegionInfoDTO> {
        return {
            ...(await this.getScenicRegionInfoByIdAndLang(
                scenicRegionId,
                lang
            )),
        };
    }

    /********************************************  private methods  *******************************************************************/

    private async getScenicRegionById(id: string): Promise<ScenicRegion> {
        return this.prisma.scenicRegion.findUnique({ where: { id } });
    }

    private getScenicRegionInfoById(id: string): Promise<ScenicRegionInfo> {
        return this.prisma.scenicRegionInfo.findUnique({
            where: { id },
        });
    }

    private getScenicRegionInfosByScenicRegionId(
        scenicRegionId: string
    ): Promise<ScenicRegionInfo[]> {
        return this.prisma.scenicRegionInfo.findMany({
            where: { scenicRegionId },
        });
    }

    private getScenicRegionInfoByIdAndLang(
        scenicRegionId: string,
        lang: Language
    ): Promise<ScenicRegionInfo> {
        return this.prisma.scenicRegionInfo.findFirst({
            where: { scenicRegionId, lang },
        });
    }

    private combineScenicRegion(
        base: ScenicRegion,
        scenicRegionInfos: ScenicRegionInfo[]
    ): ScenicRegionDTO {
        const scenicRegionInfoDtos: ScenicRegionInfoDTO[] = [];

        scenicRegionInfos.forEach((item) => {
            scenicRegionInfoDtos.push({ ...item });
        });
        const data: ScenicRegionDTO = { ...base, scenicRegionInfoDtos };
        return data;
    }
}
