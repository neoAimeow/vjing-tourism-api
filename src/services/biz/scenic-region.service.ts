import { CreateScenicRegionInput } from './../../resolvers/scenic-region/dto/create-scenic-region.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ScenicRegionService {
    constructor(private prisma: PrismaService) {}

    //还没有景区时，创建第一个景区
    async createScenicRegion(createScenicRegionInput: CreateScenicRegionInput) {
        return this.prisma.scenicRegion.create({
            data: {
                location: createScenicRegionInput.location,
                zoom: createScenicRegionInput.zoom,
                minZoom: createScenicRegionInput.minZoom,
                maxZoom: createScenicRegionInput.maxZoom,
                enableNavigation: createScenicRegionInput.enableNavigation,
                enablePoiLanguageSwitch:
                    createScenicRegionInput.enablePoiLanguageSwitch,
                sliceState: createScenicRegionInput.sliceState,
                scenicRegionInfos: {
                    create: [
                        {
                            name: createScenicRegionInput.name,
                            handDrawingUri:
                                createScenicRegionInput.handDrawingUri,
                            handDrawingNE:
                                createScenicRegionInput.handDrawingNE,
                            handDrawingSW:
                                createScenicRegionInput.handDrawingSW,
                            vrUrl: createScenicRegionInput.vrUrl,
                            ticketUrl: createScenicRegionInput.ticketUrl,
                            title: createScenicRegionInput.title,
                            layer: createScenicRegionInput.layer,
                            layersDisplayName:
                                createScenicRegionInput.layerDisplayName,
                            lang: createScenicRegionInput.lang,
                        },
                    ],
                },
            },
        });
    }

    //还没有景区时，创建第一个景区
    async createScenicRegionWithLang(
        createScenicRegionInput: CreateScenicRegionInput
    ) {
        if (!createScenicRegionInput.scenicRegionId) {
            throw new BadRequestException('scenicRegionId can not be null');
        }
        //先查询该语种的数据是否存在。
        const result = this.prisma.scenicRegionInfo.findFirst({
            where: {
                scenicRegionId: createScenicRegionInput.scenicRegionId,
                lang: createScenicRegionInput.lang,
            },
        });

        if (result) {
            throw new BadRequestException('lang data already exist');
        }

        //如果该语种不存在就创建国际化数据。
        return this.prisma.scenicRegionInfo.create({
            data: {
                scenicRegionId: createScenicRegionInput.scenicRegionId,
                name: createScenicRegionInput.name,
                handDrawingUri: createScenicRegionInput.handDrawingUri,
                handDrawingNE: createScenicRegionInput.handDrawingNE,
                handDrawingSW: createScenicRegionInput.handDrawingSW,
                vrUrl: createScenicRegionInput.vrUrl,
                ticketUrl: createScenicRegionInput.ticketUrl,
                title: createScenicRegionInput.title,
                layer: createScenicRegionInput.layer,
                layersDisplayName: createScenicRegionInput.layerDisplayName,
                lang: createScenicRegionInput.lang,
            },
        });
    }
}
