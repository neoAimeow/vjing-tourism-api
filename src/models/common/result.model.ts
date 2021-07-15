import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Result {
    @Field({ description: '是否成功' })
    isSuccess?: boolean;
}
