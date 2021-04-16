import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class ScenicRegionInfoArgs {
    @IsNotEmpty()
    lang: string;
    @IsNotEmpty()
    scenicRegionId: string;
}
