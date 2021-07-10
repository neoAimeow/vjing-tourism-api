import { InputType, Field } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @MinLength(2)
    @MaxLength(10)
    name: string;
    @Field()
    @IsEmail()
    email: string;
    @Field()
    role: Role;
    @Field()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
