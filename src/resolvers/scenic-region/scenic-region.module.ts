import { ScenicRegionResolver } from './scenic-region.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/common/prisma.service';
import { ScenicRegionService } from 'src/services/biz/scenic-region.service';

@Module({
    providers: [ScenicRegionResolver, ScenicRegionService, PrismaService],
})
export class ScenicRegionModule {}
