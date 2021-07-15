import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
    after?: string;

    before?: string;

    first?: number;

    last?: number;
}
