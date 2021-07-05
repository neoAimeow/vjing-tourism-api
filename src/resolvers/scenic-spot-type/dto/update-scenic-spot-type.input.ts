import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Language } from '@prisma/client';
@InputType()
export class UpdateScenicSpotTypeInput {
    @Field({ nullable: true })
    rank?: number;
    @Field({ nullable: true })
    name?: string;
    @Field()
    @IsNotEmpty()
    lang: Language;
}
