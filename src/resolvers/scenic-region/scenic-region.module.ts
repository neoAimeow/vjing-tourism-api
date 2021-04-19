import { ScenicRegionResolver } from './scenic-region.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/common/prisma.service';

@Module({
    providers: [ScenicRegionResolver, PrismaService],
})
export class ScenicRegionModule {}
