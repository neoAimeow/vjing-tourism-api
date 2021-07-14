import { InputType, Field } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    name?: string;
    @Field((type) => Role, { nullable: true })
    role?: Role;
}
