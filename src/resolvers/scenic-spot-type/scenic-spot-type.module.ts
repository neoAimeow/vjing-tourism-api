import { ScenicSpotTypeService } from './../../services/biz/scenic-spot-type.service';
import { ScenicSpotTypeResolver } from './scenic-spot.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/common/prisma.service';

@Module({
    providers: [ScenicSpotTypeResolver, ScenicSpotTypeService, PrismaService],
})
export class ScenicSpotTypeModule {}
