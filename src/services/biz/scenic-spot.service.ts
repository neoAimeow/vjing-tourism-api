import { CreateScenicSpotInput } from './../../resolvers/scenic-spot/dto/create-scenic-spot.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ScenicSpotService {
    constructor(private prisma: PrismaService) {}

    async createScenicSpot(createScenicSpotInput: CreateScenicSpotInput) {
        return this.prisma.scenicSpot.create({
            data: {
                scenicRegionId: createScenicSpotInput.scenicRegionId,
                scenicSpotTypeId: createScenicSpotInput.scenicSpotTypeId,
                hidden: createScenicSpotInput.hidden,
                scenicSpotInfos: {
                    create: [
                        {
                            name: createScenicSpotInput.name,
                            introduction: createScenicSpotInput.introduction,
                            iconUri: createScenicSpotInput.iconUri,
                            audioUri: createScenicSpotInput.audioUri,
                            imageUri: createScenicSpotInput.imageUri,
                            lang: createScenicSpotInput.lang,
                        },
                    ],
                },
            },
        });
    }
}
