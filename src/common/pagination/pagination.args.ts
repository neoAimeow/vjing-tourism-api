import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
    after?: string | undefined;

    before?: string | undefined;

    first?: number | undefined;

    last?: number | undefined;
}
