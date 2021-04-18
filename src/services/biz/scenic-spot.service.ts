import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ScenicSpotService {
    constructor(private prisma: PrismaService) {}
}
