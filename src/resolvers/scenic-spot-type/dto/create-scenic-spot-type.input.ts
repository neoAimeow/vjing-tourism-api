import { Language } from './../../../models/base.model';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateScenicSpotTypeInput {
    @Field()
    @IsNotEmpty()
    scenicRegionId: string;
    @Field({ nullable: true })
    rank?: number;
    @Field({ nullable: true })
    name?: string;
    @Field()
    @IsNotEmpty()
    lang: Language;
}
