import { Language } from './../../../models/base.model';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class UpdateScenicSpotInput {
    @Field({ nullable: true })
    scenicSpotTypeId?: string;
    @Field({ nullable: true })
    hidden?: boolean;
    @Field({ nullable: true })
    name?: string;
    @Field({ nullable: true })
    introduction?: string;
    @Field({ nullable: true })
    iconUri?: string;
    @Field({ nullable: true })
    audioUri?: string;
    @Field({ nullable: true })
    imageUri?: string;
    @Field()
    @IsNotEmpty()
    lang: Language;
}
