import {
    CreateScenicRegionInput,
    CreateScenicRegionInfoInput,
} from './../../resolvers/scenic-region/dto/create-scenic-region.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ScenicRegionService {
    constructor(private prisma: PrismaService) {}

    //还没有景区时，创建第一个景区
    async createScenicRegion(input: CreateScenicRegionInput) {
        return this.prisma.scenicRegion.create({
            data: {
                location: input.location,
                zoom: input.zoom,
                minZoom: input.minZoom,
                maxZoom: input.maxZoom,
                enableNavigation: input.enableNavigation,
                enablePoiLanguageSwitch: input.enablePoiLanguageSwitch,
                sliceState: input.sliceState,
                scenicRegionInfos: {
                    create: [
                        {
                            name: input.name,
                            handDrawingUri: input.handDrawingUri,
                            handDrawingNE: input.handDrawingNE,
                            handDrawingSW: input.handDrawingSW,
                            vrUrl: input.vrUrl,
                            ticketUrl: input.ticketUrl,
                            title: input.title,
                            layer: input.layer,
                            layersDisplayName: input.layerDisplayName,
                            lang: input.lang,
                        },
                    ],
                },
            },
        });
    }

    //还没有景区时，创建第一个景区
    async createScenicRegionWithLang(input: CreateScenicRegionInfoInput) {
        //先查询该语种的数据是否存在。
        const result = this.prisma.scenicRegionInfo.findFirst({
            where: {
                scenicRegionId: input.scenicRegionId,
                lang: input.lang,
            },
        });

        if (result) {
            throw new BadRequestException('lang data already exist');
        }

        //如果该语种不存在就创建国际化数据。
        return this.prisma.scenicRegionInfo.create({
            data: {
                scenicRegionId: input.scenicRegionId,
                name: input.name,
                handDrawingUri: input.handDrawingUri,
                handDrawingNE: input.handDrawingNE,
                handDrawingSW: input.handDrawingSW,
                vrUrl: input.vrUrl,
                ticketUrl: input.ticketUrl,
                title: input.title,
                layer: input.layer,
                layersDisplayName: input.layerDisplayName,
                lang: input.lang,
            },
        });
    }
}
