import { Language } from './../../../models/base.model';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateScenicSpotInput {
    @Field()
    @IsNotEmpty()
    scenicRegionId: string;
    @Field({ nullable: true })
    scenicSpotTypeId?: string;
    @Field({ nullable: true })
    hidden?: boolean;
    @Field()
    @IsNotEmpty()
    name: string;
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

@InputType()
export class CreateScenicSpotInfoInput {
    @Field()
    @IsNotEmpty()
    scenicSpotId: string;
    @Field()
    @IsNotEmpty()
    name: string;
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
