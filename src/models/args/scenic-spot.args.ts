import { Field, ArgsType } from '@nestjs/graphql';
import { isNotEmpty, IsNotEmpty } from 'class-validator';

@ArgsType()
export class ScenicSpotIdArgs {
    @IsNotEmpty()
    scenicSpotId: string;
}

@ArgsType()
export class ScenicSpotQueryArgs {
    @IsNotEmpty()
    scenicRegionId: string;
}
