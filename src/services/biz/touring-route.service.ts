import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TouringRouteService {
    constructor(private prisma: PrismaService) {}
}
