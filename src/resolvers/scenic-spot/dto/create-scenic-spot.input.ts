import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Language } from '@prisma/client';

@InputType()
export class CreateScenicSpotInput {
    @Field()
    scenicRegionId: string;
    @Field()
    unionName: string;
    @Field()
    scenicSpotTypeId: string;
    @Field()
    hidden?: boolean;
}
@InputType()
export class CreateScenicSpotInfoInput {
    @Field()
    scenicSpotId: string;
    @Field()
    name: string;
    @Field()
    introduction?: string;
    @Field()
    iconUri?: string;
    @Field()
    audioUri?: string;
    @Field()
    imageUri?: string;
}
