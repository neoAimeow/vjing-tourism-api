import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Language } from '@prisma/client';
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
