import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';
import { SliceState } from '@prisma/client';
@InputType()
export class CreateScenicRegionInput {
    @Field()
    @IsNotEmpty()
    displayName: string;

    @Field({ nullable: true })
    zoom?: number;
    @Field({ nullable: true })
    minZoom?: number;
    @Field({ nullable: true })
    maxZoom?: number;
    @Field((type) => Float, { nullable: true })
    locationLng?: number;
    @Field((type) => Float, { nullable: true })
    locationLat?: number;
    @Field({ nullable: true })
    enableNavigation?: boolean;
    @Field({ nullable: true })
    enablePoiLanguageSwitch?: boolean;
}

@InputType()
export class CreateScenicRegionInfoInput {
    @Field()
    @IsNotEmpty()
    name: string;
    @Field({ nullable: true })
    handDrawingUri?: string;
    @Field({ nullable: true })
    vrUrl?: string;
    @Field({ nullable: true })
    ticketUrl?: string;
    @Field({ nullable: true })
    title?: string;
    @Field({ nullable: true })
    layer?: string;
    @Field({ nullable: true })
    layersDisplayName?: string;
}
