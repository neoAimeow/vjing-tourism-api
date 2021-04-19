import { Language } from './../../../models/base.model';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
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
