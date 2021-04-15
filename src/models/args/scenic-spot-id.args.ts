import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class ScenicSpotArgs {
  @IsNotEmpty()
  scenicSpotId: string;
}
