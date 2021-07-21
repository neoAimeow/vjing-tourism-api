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
import { Language, SliceState } from '@prisma/client';
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
        lang?: Language
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
                    handDrawingNELat: 0,
                    handDrawingNELng: 0,
                    handDrawingSWLat: 0,
                    handDrawingSWLng: 0,
                    enableNavigation: regionInput.enableNavigation || false,
                    enablePoiLanguageSwitch:
                        regionInput.enablePoiLanguageSwitch || false,
                    sliceState: SliceState.PENDING,
                },
            });
            const scenicRegionInfoDto: ScenicRegionInfoDTO =
                await this.createScenicRegionInfoWithLang(
                    data.id,
                    regionInfoInput,
                    lang || Language.CHINESE
                );

            return {
                ...data,
                scenicRegionInfoDtos: [scenicRegionInfoDto],
            };
        } catch (ex) {
            throw new BadRequestException(ex);
        }
    }

    async createScenicRegionInfoWithLang(
        scenicRegionId: string,
        input: CreateScenicRegionInfoInput,
        lang: Language
    ): Promise<ScenicRegionInfoDTO> {
        try {
            const hasDataResult = await this.prisma.scenicRegion.findUnique({
                where: { id: scenicRegionId },
            });

            if (!hasDataResult) {
                throw new BadRequestException(
                    'scenicRegionId错误，不存在该景区'
                );
            }

            const hasLangResult = await this.prisma.scenicRegionInfo.findFirst({
                where: { scenicRegionId, lang },
            });

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
                    layersDisplayName: input.layersDisplayName || '',
                    lang: lang,
                },
            });

            //如果该语种不存在就创建国际化数据。
            return { ...data };
        } catch (ex) {
            throw new BadRequestException(ex);
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
            throw new BadRequestException(ex);
        }
    }

    async updateScenicRegionInfo(
        id: string,
        regionInfoInput: UpdateScenicRegionInfoInput
    ): Promise<ScenicRegionInfoDTO> {
        try {
            const data = await this.prisma.scenicRegionInfo.update({
                where: { id },
                data: {
                    name: regionInfoInput.name,
                    handDrawingUri: regionInfoInput.handDrawingUri || '',
                    vrUrl: regionInfoInput.vrUrl || '',
                    ticketUrl: regionInfoInput.ticketUrl || '',
                    title: regionInfoInput.title || '',
                    layer: regionInfoInput.layer || '',
                    layersDisplayName: regionInfoInput.layersDisplayName || '',
                },
            });

            return { ...data };
        } catch (ex) {
            throw new BadRequestException(ex);
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
            throw new BadRequestException(ex);
        }
    }

    async deleteScenicRegionInfo(id: string): Promise<boolean> {
        try {
            const result = await this.prisma.scenicRegionInfo.delete({
                where: { id },
            });
            return result === null;
        } catch (ex) {
            throw new BadRequestException(ex);
        }
    }

    /********************************************  query ScenicRegion  *******************************************************************/

    queryScenicRegionInfoById(id: string): Promise<ScenicRegionInfoDTO> {
        return this.prisma.scenicRegionInfo.findUnique({
            where: { id },
        });
    }

    async queryScenicRegions(
        { after, before, first, last }: PaginationArgs,
        orderBy: ScenicRegionOrder
    ): Promise<ScenicRegionConnection> {
        const orderByDefault: ScenicRegionOrder = {
            field: ScenicRegionOrderField.createdAt,
            direction: OrderDirection.desc,
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

    /********************************************  query ScenicRegionInfo  *******************************************************************/

    queryScenicRegionById(id: string): Promise<ScenicRegionDTO> {
        return this.prisma.scenicRegion.findUnique({ where: { id } });
    }

    async queryScenicRegionInfosByScenicRegionId(
        scenicRegionId: string
    ): Promise<ScenicRegionInfoDTO[]> {
        const result: ScenicRegionInfoDTO[] = [];
        const array = await this.prisma.scenicRegionInfo.findMany({
            where: { scenicRegionId },
        });
        array.forEach((element) => {
            const data: ScenicRegionInfoDTO = { ...element };
            result.push(data);
        });
        return result;
    }
}
