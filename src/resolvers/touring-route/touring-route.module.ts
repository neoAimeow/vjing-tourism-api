import { TouringRouteService } from './../../services/biz/touring-route.service';
import { TouringRouteResolver } from './touring-route.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/common/prisma.service';

@Module({
    providers: [TouringRouteResolver, TouringRouteService, PrismaService],
})
export class TouringRouteModule {}
