import { CreateTouringRouteInput } from './../../resolvers/touring-route/dto/create-touring-route.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TouringRouteService {
    constructor(private prisma: PrismaService) {}
    async createTouringRoute(createTouringRouteInput: CreateTouringRouteInput) {
        return this.prisma.touringRoute.create({
            data: {
                scenicRegionId: createTouringRouteInput.scenicRegionId,
                touringRouteInfos: {
                    create: [
                        {
                            title: createTouringRouteInput.title,
                            content: createTouringRouteInput.content,
                            lang: createTouringRouteInput.lang,
                        },
                    ],
                },
            },
        });
    }
}
