import { ScenicSpotResolver } from './scenic-spot.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/common/prisma.service';
import { ScenicSpotService } from 'src/services/biz/scenic-spot.service';

@Module({
    providers: [ScenicSpotResolver, ScenicSpotService, PrismaService],
})
export class ScenicSpotModule {}
