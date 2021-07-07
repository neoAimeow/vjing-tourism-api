import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Language } from '@prisma/client';
@InputType()
export class CreateTouringRouteInput {
    @Field()
    @IsNotEmpty()
    scenicRegionId: string;
    @Field()
    displayName: string;
}

@InputType()
export class CreateTouringRouteInfoInput {
    @Field()
    touringRouteId: string;
    @Field()
    title: string;
    @Field()
    content: string;
    @Field((type) => Language)
    lang: Language;
}
