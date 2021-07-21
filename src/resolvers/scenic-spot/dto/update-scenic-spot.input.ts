import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';
import { Language } from '@prisma/client';
@InputType()
export class UpdateScenicSpotInput {
    @Field()
    scenicRegionId: string;
    @Field()
    displayName: string;
    @Field()
    scenicSpotTypeId: string;
    @Field((type) => Float, { nullable: true })
    locationLng?: number;
    @Field((type) => Float, { nullable: true })
    locationLat?: number;
    @Field()
    hidden: boolean;
}
@InputType()
export class UpdateScenicSpotInfoInput {
    @Field()
    scenicSpotId: string;
    @Field()
    name: string;
    @Field()
    introduction: string;
    @Field()
    iconUri: string;
    @Field()
    audioUri: string;
    @Field()
    imageUri: string;
}
