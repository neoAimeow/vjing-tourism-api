import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/common/prisma.service';
import { UserService } from '../../services/admin/user.service';
import { PasswordService } from '../../services/admin/password.service';

@Module({
    providers: [UserResolver, UserService, PasswordService, PrismaService],
})
export class UserModule {}
