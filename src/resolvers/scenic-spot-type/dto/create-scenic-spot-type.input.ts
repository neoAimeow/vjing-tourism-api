import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Language } from '@prisma/client';
@InputType()
export class CreateScenicSpotTypeInput {
    @Field({ nullable: true })
    displayName?: string;
    @Field({ nullable: true })
    icon: string;
}

@InputType()
export class CreateScenicSpotTypeInfoInput {
    @Field({ nullable: true })
    name?: string;
}
