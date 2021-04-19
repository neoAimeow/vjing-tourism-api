import { UpdateScenicSpotTypeInput } from './../../resolvers/scenic-spot-type/dto/update-scenic-spot-type.input';
import { CreateScenicSpotTypeInput } from './../../resolvers/scenic-spot-type/dto/create-scenic-spot-type.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ScenicSpotTypeService {
    constructor(private prisma: PrismaService) {}

    async createScenicSpotType(
        createScenicSpotTypeInput: CreateScenicSpotTypeInput
    ) {
        return this.prisma.scenicSpotType.create({
            data: {
                scenicRegionId: createScenicSpotTypeInput.scenicRegionId,
                rank: createScenicSpotTypeInput.rank,
                scenicSpotTypeInfos: {
                    create: [
                        {
                            name: createScenicSpotTypeInput.name,
                            lang: createScenicSpotTypeInput.lang,
                        },
                    ],
                },
            },
        });
    }

    async updateScenicSpotType(
        updateScenicSpotTypeInput: UpdateScenicSpotTypeInput
    ) {
        // return this.prisma.scenicSpotType.create({
        //     data: {
        //         scenicRegionId: updateScenicSpotTypeInput.scenicRegionId,
        //         rank: updateScenicSpotTypeInput.rank,
        //         scenicSpotTypeInfos: {
        //             create: [
        //                 {
        //                     name: updateScenicSpotTypeInput.name,
        //                     lang: updateScenicSpotTypeInput.lang,
        //                 },
        //             ],
        //         },
        //     },
        // });
    }
}
