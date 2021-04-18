import { CreateScenicRegionInput } from './../../resolvers/scenic-region/dto/create-scenic-region.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ScenicRegionService {
    constructor(private prisma: PrismaService) {}

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
                scenicRegions: {
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
}
