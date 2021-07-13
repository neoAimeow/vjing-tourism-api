import { UserDTO } from './../../models/user.model';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from '../../resolvers/auth/dto/signup.input';
import { PrismaService } from '../common/prisma.service';
import { Prisma, User } from '@prisma/client';
import { Token } from '../../models/token.model';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/configs/config.interface';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { OrderDirection } from 'src/common/order/order-direction';
import { UserOrder, UserOrderField } from 'src/models/inputs/user-order.input';
import { UserConnection } from 'src/models/pagination/user-connection.model';
import { UpdateUserInput } from 'src/resolvers/auth/dto/update-user.input';
import { ChangePasswordInput } from 'src/resolvers/auth/dto/change-password.input';
import { Auth } from 'src/models/auth.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService,
        private readonly configService: ConfigService
    ) {}

    async createUser(payload: SignupInput): Promise<UserDTO> {
        const hashedPassword = await this.passwordService.hashPassword(
            payload.password
        );

        try {
            const user = await this.prisma.user.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    password: hashedPassword,
                    role: payload.role || 'USER',
                },
            });

            return user;
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new ConflictException(
                    `Email ${payload.email} already used.`
                );
            } else {
                throw new Error(e);
            }
        }
    }

    async login(email: string, password: string): Promise<Auth> {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        const passwordValid = await this.passwordService.validatePassword(
            password,
            user.password
        );

        if (!passwordValid) {
            throw new BadRequestException('Invalid password');
        }

        return {
            ...this.generateToken({
                userId: user.id,
            }),
            user: user,
        };
    }

    validateUser(userId: string): Promise<User> {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }

    getUserFromToken(token: string): Promise<User> {
        const id = this.jwtService.decode(token)['userId'];
        return this.prisma.user.findUnique({ where: { id } });
    }

    generateToken(payload: { userId: string }): Token {
        const accessToken = this.jwtService.sign(payload);

        const securityConfig =
            this.configService.get<SecurityConfig>('security');
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: securityConfig.refreshIn,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    refreshToken(token: string) {
        try {
            const { userId } = this.jwtService.verify(token);

            return this.generateToken({
                userId,
            });
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    updateUser(userId: string, newUserData: UpdateUserInput) {
        return this.prisma.user.update({
            data: newUserData,
            where: {
                id: userId,
            },
        });
    }

    async queryUsers(
        { skip, after, before, first, last }: PaginationArgs,
        orderBy: UserOrder
    ): Promise<UserConnection> {
        const orderByDefault: UserOrder = {
            field: UserOrderField.createdAt,
            direction: OrderDirection.asc,
        };

        const a = await findManyCursorConnection(
            (args) =>
                this.prisma.user.findMany({
                    orderBy: orderBy
                        ? { [orderBy.field]: orderBy.direction }
                        : { [orderByDefault.field]: orderByDefault.direction },
                    ...args,
                }),
            () => this.prisma.user.count(),
            { first, last, before, after }
        );
        return a;
    }

    async changePassword(
        userId: string,
        userPassword: string,
        changePassword: ChangePasswordInput
    ) {
        const passwordValid = await this.passwordService.validatePassword(
            changePassword.oldPassword,
            userPassword
        );

        if (!passwordValid) {
            throw new BadRequestException('Invalid password');
        }

        const hashedPassword = await this.passwordService.hashPassword(
            changePassword.newPassword
        );

        return this.prisma.user.update({
            data: {
                password: hashedPassword,
            },
            where: { id: userId },
        });
    }

    async deleteUser(id: string): Promise<UserDTO> {
        try {
            const result = await this.prisma.user.delete({
                where: { id },
            });
            console.warn(result);
            return result;
        } catch (ex) {
            return null;
        }
    }
}
