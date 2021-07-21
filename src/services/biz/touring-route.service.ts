import {
    CreateTouringRouteInfoInput,
    CreateTouringRouteInput,
} from './../../resolvers/touring-route/dto/create-touring-route.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Language, TouringRouteInfo, TouringRoute } from '@prisma/client';
import {
    TouringRouteDTO,
    TouringRouteInfoDTO,
} from 'src/models/touring-route.model';
import {
    UpdateTouringRouteInput,
    UpdateTouringRouteInfoInput,
} from 'src/resolvers/touring-route/dto/update-touring-route.input';

@Injectable()
export class TouringRouteService {
    constructor(private prisma: PrismaService) {}

    /********************************************  create TouringRoute  *******************************************************************/

    async createTouringRoute(
        scenicRegionId: string,
        spotTypeInput: CreateTouringRouteInput,
        spotTypeInfoInput: CreateTouringRouteInfoInput,
        lang: Language
    ): Promise<TouringRouteDTO> {
        try {
            const data = await this.prisma.touringRoute.create({
                data: {
                    scenicRegionId,
                    displayName: spotTypeInput.displayName,
                },
            });
            const TouringRouteInfoDto: TouringRouteInfoDTO =
                await this.createTouringRouteInfoWithLang(
                    data.id,
                    spotTypeInfoInput,
                    lang
                );

            return {
                ...data,
                touringRouteInfoDtos: [TouringRouteInfoDto],
            };
        } catch (ex) {
            return null;
        }
    }

    async createTouringRouteInfoWithLang(
        touringRouteId: string,
        input: CreateTouringRouteInfoInput,
        lang: Language
    ): Promise<TouringRouteInfoDTO> {
        try {
            const hasDataResult = this.prisma.touringRoute.findUnique({
                where: { id: touringRouteId },
            });
            if (!hasDataResult) {
                throw new BadRequestException(
                    'TouringRouteId错误，不存在该分类'
                );
            }

            const hasLangResult = await this.prisma.touringRouteInfo.findFirst({
                where: { touringRouteId, lang },
            });
            if (hasLangResult) {
                throw new BadRequestException('该分类已经存在这个语言的信息');
            }

            const data = await this.prisma.touringRouteInfo.create({
                data: {
                    touringRouteId,
                    title: input.title || '',
                    content: input.content || '',
                },
            });

            //如果该语种不存在就创建国际化数据。
            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    /********************************************  update TouringRoute  *******************************************************************/

    async updateTouringRoute(
        id: string,
        spotTypeInput: UpdateTouringRouteInput
    ): Promise<TouringRouteDTO> {
        try {
            const data = await this.prisma.touringRoute.update({
                where: { id },
                data: {
                    displayName: spotTypeInput.displayName,
                },
            });

            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    async updateTouringRouteInfo(
        id: string,
        spotTypeInput: UpdateTouringRouteInfoInput
    ): Promise<TouringRouteInfoDTO> {
        try {
            const data = await this.prisma.touringRouteInfo.update({
                where: { id },
                data: {
                    title: spotTypeInput.title || '',
                    content: spotTypeInput.content || '',
                },
            });

            return { ...data };
        } catch (ex) {
            return null;
        }
    }

    /********************************************  delete TouringRoute  *******************************************************************/

    async deleteTouringRoute(id: string): Promise<boolean> {
        try {
            const deleteFather = this.prisma.touringRoute.delete({
                where: { id },
            });
            const deleteChildren = this.prisma.touringRouteInfo.deleteMany({
                where: { touringRouteId: id },
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

    async deleteTouringRouteInfo(id: string): Promise<boolean> {
        try {
            const result = await this.prisma.touringRouteInfo.delete({
                where: { id },
            });
            return result === null;
        } catch (ex) {
            return null;
        }
    }

    /********************************************  query TouringRoute  *******************************************************************/

    queryTouringRouteInfoById(id: string): Promise<TouringRouteInfoDTO> {
        return this.prisma.touringRouteInfo.findUnique({
            where: { id },
        });
    }

    /********************************************  query TouringRouteInfo  *******************************************************************/

    queryTouringRouteById(id: string): Promise<TouringRouteDTO> {
        return this.prisma.touringRoute.findUnique({ where: { id } });
    }

    async queryTouringRouteInfosByTouringRouteId(
        touringRouteId: string
    ): Promise<TouringRouteInfoDTO[]> {
        const result: TouringRouteInfoDTO[] = [];
        const array = await this.prisma.touringRouteInfo.findMany({
            where: { touringRouteId },
        });
        array.forEach((element) => {
            const data: TouringRouteInfoDTO = { ...element };
            result.push(data);
        });
        return result;
    }
}
