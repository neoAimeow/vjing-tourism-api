import { Language } from './../../../models/base.model';
import { SliceState } from './../../../models/scenic-region.model';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateScenicRegionInput {
    @Field()
    @IsNotEmpty()
    name: string;
    @Field({ nullable: true })
    location?: string;
    @Field({ nullable: true })
    zoom?: number;
    @Field({ nullable: true })
    minZoom?: number;
    @Field({ nullable: true })
    maxZoom?: number;
    @Field({ nullable: true })
    enableNavigation?: boolean;
    @Field({ nullable: true })
    enablePoiLanguageSwitch?: boolean;
    @Field({ nullable: true })
    sliceState?: SliceState;
    @Field({ nullable: true })
    handDrawingUri?: string;
    @Field({ nullable: true })
    handDrawingNE?: string;
    @Field({ nullable: true })
    handDrawingSW?: string;
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
    @Field()
    @IsNotEmpty()
    lang: Language;
}