import { InputType, Field, Float } from '@nestjs/graphql';
import { SliceState } from '@prisma/client';
@InputType()
export class UpdateScenicRegionInput {
    @Field()
    displayName?: string;
    @Field({ nullable: true })
    zoom?: number;
    @Field({ nullable: true })
    minZoom?: number;
    @Field((type) => Float, { nullable: true })
    locationLng?: number;
    @Field((type) => Float, { nullable: true })
    locationLat?: number;
    @Field((type) => Float, { nullable: true })
    handDrawingNELat?: number;
    @Field((type) => Float, { nullable: true })
    handDrawingNELng?: number;
    @Field((type) => Float, { nullable: true })
    handDrawingSWLat?: number;
    @Field((type) => Float, { nullable: true })
    handDrawingSWLng?: number;
    @Field({ nullable: true })
    maxZoom?: number;
    @Field({ nullable: true })
    enableNavigation?: boolean;
    @Field({ nullable: true })
    enablePoiLanguageSwitch?: boolean;
    @Field({ nullable: true })
    sliceState?: SliceState;
}

@InputType()
export class UpdateScenicRegionInfoInput {
    @Field()
    name?: string;
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
    layerDisplayName?: string;
}
