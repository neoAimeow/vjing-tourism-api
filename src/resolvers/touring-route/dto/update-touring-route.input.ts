import { Language } from './../../../models/base.model';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class UpdateTouringRouteInput {
    @Field({ nullable: true })
    title?: string;
    @Field({ nullable: true })
    content?: string;
    @Field()
    @IsNotEmpty()
    lang: Language;
}
