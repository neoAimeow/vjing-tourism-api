import { TouringRouteResolver } from './touring-route.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/common/prisma.service';

@Module({
    providers: [TouringRouteResolver, PrismaService],
})
export class TouringRouteModule {}
