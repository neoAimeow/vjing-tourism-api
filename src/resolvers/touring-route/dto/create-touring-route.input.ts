import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Language } from '@prisma/client';
@InputType()
export class CreateTouringRouteInput {
    @Field()
    @IsNotEmpty()
    scenicRegionId: string;
    @Field()
    @IsNotEmpty()
    title: string;
    @Field({ nullable: true })
    content: string;
    @Field()
    @IsNotEmpty()
    lang: Language;
}
