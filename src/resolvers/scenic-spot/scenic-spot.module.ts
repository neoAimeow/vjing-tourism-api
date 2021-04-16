import { ScenicSpotResolver } from './scenic-spot.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Module({
    providers: [ScenicSpotResolver, PrismaService],
})
export class ScenicSpotModule {}
