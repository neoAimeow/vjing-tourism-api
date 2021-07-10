import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupInput {
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @Field()
    name: string;
    @Field((type) => Role)
    role?: Role;
}
