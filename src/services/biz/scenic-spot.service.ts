import { CreateScenicSpotInput } from './../../resolvers/scenic-spot/dto/create-scenic-spot.input';
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
    async createScenicSpotWithLang(input: CreateScenicSpotInput) {}
}
