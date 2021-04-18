import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ScenicRegionService {
    constructor(private prisma: PrismaService) {}
}
