import {
    CreateScenicRegionInput,
    CreateScenicRegionInfoInput,
} from './../../resolvers/scenic-region/dto/create-scenic-region.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Language, ScenicRegion, ScenicRegionInfo } from '@prisma/client';
import {
    ScenicRegionDTO,
    ScenicRegionInfoDTO,
} from 'src/models/scenic-region.model';

@Injectable()
export class ScenicRegionService {
    constructor(private prisma: PrismaService) {}

    //还没有景区时，创建第一个景区
    async createScenicRegion(
        regionInput: CreateScenicRegionInput,
        regionInfoInput: CreateScenicRegionInfoInput,
        lang: Language
    ) {
        const data = this.prisma.scenicRegion.create({
            data: {
                unionName: regionInput.unionName,
                location: regionInput.location || '',
                zoom: regionInput.zoom || 10,
                minZoom: regionInput.minZoom || 5,
                maxZoom: regionInput.maxZoom || 15,
                enableNavigation: regionInput.enableNavigation || false,
                enablePoiLanguageSwitch:
                    regionInput.enablePoiLanguageSwitch || false,
                sliceState: regionInput.sliceState,
                scenicRegionInfos: {
                    create: [
                        {
                            name: regionInfoInput.name,
                            handDrawingUri:
                                regionInfoInput.handDrawingUri || '',
                            handDrawingNE: regionInfoInput.handDrawingNE || '',
                            handDrawingSW: regionInfoInput.handDrawingSW || '',
                            vrUrl: regionInfoInput.vrUrl || '',
                            ticketUrl: regionInfoInput.ticketUrl || '',
                            title: regionInfoInput.title || '',
                            layer: regionInfoInput.layer || '',
                            layersDisplayName:
                                regionInfoInput.layerDisplayName || '',
                            lang: lang || Language.CHINESE,
                        },
                    ],
                },
            },
        });
        console.warn(JSON.stringify(data));
        return data;
    }

    //还没有景区时，创建第一个景区
    async createScenicRegionInfoWithLang(
        scenicRegionId: string,
        input: CreateScenicRegionInfoInput,
        lang: Language
    ) {
        const hasDataResult = await this.getScenicRegionById(scenicRegionId);
        if (!hasDataResult) {
            throw new BadRequestException('scenicRegionId错误，不存在该景区');
        }

        const hasLangResult = await this.getScenicRegionInfo(
            scenicRegionId,
            lang
        );
        if (hasLangResult) {
            throw new BadRequestException('该景区已经存在这个语言的信息');
        }

        //如果该语种不存在就创建国际化数据。
        return this.prisma.scenicRegionInfo.create({
            data: {
                scenicRegionId: scenicRegionId,
                name: input.name,
                handDrawingUri: input.handDrawingUri,
                handDrawingNE: input.handDrawingNE,
                handDrawingSW: input.handDrawingSW,
                vrUrl: input.vrUrl,
                ticketUrl: input.ticketUrl,
                title: input.title,
                layer: input.layer,
                layersDisplayName: input.layerDisplayName,
                lang: lang,
            },
        });
    }

    async queryScenicRegions(id: string): Promise<ScenicRegion> {
        const infos = await this.getScenicRegionInfos(id);
        const base = await this.getScenicRegionById(id);
        if (!base) {
            throw new BadRequestException('没有查询到该景点');
        }
        return this.combineScenicRegion(base, infos);
    }

    async queryScenicRegionByLang(
        id: string,
        lang: Language
    ): Promise<ScenicRegionDTO> {
        const info: ScenicRegionInfo = await this.getScenicRegionInfo(id, lang);
        if (!info) {
            throw new BadRequestException('没有查询到该景点详情');
        }

        const base: ScenicRegion = await this.getScenicRegionById(id);
        if (!base) {
            throw new BadRequestException('没有查询到该景点');
        }
        return this.combineScenicRegion(base, [info]);
    }

    private async getScenicRegionById(id: string): Promise<ScenicRegion> {
        return this.prisma.scenicRegion.findUnique({ where: { id } });
    }

    private getScenicRegionInfoById(id: string): Promise<ScenicRegionInfo> {
        return this.prisma.scenicRegionInfo.findUnique({
            where: { id },
        });
    }

    private getScenicRegionInfos(
        scenicRegionId: string
    ): Promise<ScenicRegionInfo[]> {
        return this.prisma.scenicRegionInfo.findMany({
            where: { scenicRegionId },
        });
    }

    private getScenicRegionInfo(
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
