import { UserDTO } from './../../models/user.model';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Auth } from '../../models/auth.model';
import { Token } from '../../models/token.model';
import { LoginInput } from './dto/login.input';
import {
    Resolver,
    Mutation,
    Args,
    Parent,
    ResolveField,
    Query,
} from '@nestjs/graphql';
import { AuthService } from '../../services/admin/auth.service';
import { SignupInput } from './dto/signup.input';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { ConflictException, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/decorators/user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { UserConnection } from 'src/models/pagination/user-connection.model';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { UserOrder } from 'src/models/inputs/user-order.input';

@Resolver((of) => Auth)
export class AuthResolver {
    constructor(private readonly auth: AuthService) {}

    @Mutation((returns) => UserDTO)
    async createUser(@Args('data') data: SignupInput): Promise<UserDTO> {
        try {
            data.email = data.email.toLowerCase();
            return this.auth.createUser(data);
        } catch (ex) {
            throw new ConflictException(ex);
        }
    }

    @Mutation((returns) => Auth)
    async login(@Args('data') { email, password }: LoginInput): Promise<Auth> {
        return await this.auth.login(email.toLowerCase(), password);
    }

    @Mutation((returns) => Token)
    async refreshToken(@Args('token') token: string) {
        return this.auth.refreshToken(token);
    }

    @Query((returns) => UserDTO)
    async me(@UserEntity() user: UserDTO): Promise<UserDTO> {
        return user;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => UserDTO)
    async updateUser(
        @UserEntity() user: UserDTO,
        @Args('data') newUserData: UpdateUserInput
    ): Promise<UserDTO> {
        return this.auth.updateUser(user.id, newUserData);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => UserDTO)
    async changePassword(
        @UserEntity() user: UserDTO,
        @Args('data') changePassword: ChangePasswordInput
    ) {
        return this.auth.changePassword(user.id, user.password, changePassword);
    }

    @Query((returns) => UserConnection)
    async users(
        @Args() args: PaginationArgs,
        @Args({
            name: 'orderBy',
            type: () => UserOrder,
            nullable: true,
        })
        orderBy: UserOrder
    ): Promise<UserConnection> {
        return this.auth.queryUsers(args, orderBy);
    }

    @ResolveField('user')
    async user(@Parent() auth: Auth) {
        return await this.auth.getUserFromToken(auth.accessToken);
    }

    // @UseGuards(GqlAuthGuard)
    @Mutation((returns) => UserDTO)
    async deleteUser(@Args('id') id: string): Promise<UserDTO> {
        return this.auth.deleteUser(id);
    }
}
