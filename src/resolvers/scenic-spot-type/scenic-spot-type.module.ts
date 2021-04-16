import { ScenicSpotTypeResolver } from './scenic-spot.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Module({
    providers: [ScenicSpotTypeResolver, PrismaService],
})
export class ScenicSpotTypeModule {}
