import {
    CreateScenicSpotInput,
    CreateScenicSpotInfoInput,
} from './../../resolvers/scenic-spot/dto/create-scenic-spot.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ScenicSpotService {
    constructor(private prisma: PrismaService) {}

    async createScenicSpot(input: CreateScenicSpotInput) {
        return this.prisma.scenicSpot.create({
            data: {
                scenicRegionId: input.scenicRegionId,
                scenicSpotTypeId: input.scenicSpotTypeId,
                hidden: input.hidden,
                scenicSpotInfos: {
                    create: [
                        {
                            name: input.name,
                            introduction: input.introduction,
                            iconUri: input.iconUri,
                            audioUri: input.audioUri,
                            imageUri: input.imageUri,
                            lang: input.lang,
                        },
                    ],
                },
            },
        });
    }
    async createScenicSpotWithLang(input: CreateScenicSpotInfoInput) {
        //先查询该语种的数据是否存在。
        const result = this.prisma.scenicSpotInfo.findFirst({
            where: {
                scenicSpotId: input.scenicSpotId,
                lang: input.lang,
            },
        });

        if (result) {
            throw new BadRequestException('lang data already exist');
        }

        //如果该语种不存在就创建国际化数据。
        return this.prisma.scenicSpotInfo.create({
            data: {
                scenicSpotId: input.scenicSpotId,
                name: input.name,
                introduction: input.introduction,
                iconUri: input.iconUri,
                audioUri: input.audioUri,
                imageUri: input.imageUri,
                lang: input.lang,
            },
        });
    }
}
