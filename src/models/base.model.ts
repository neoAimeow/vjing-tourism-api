/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { Language } from '@prisma/client';

registerEnumType(Language, {
    name: 'Language',
    description: 'Language',
});

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
    @Field((type) => ID)
    id: string;
    @Field({
        description:
            'Identifies the date and time when the object was created.',
    })
    createdAt: Date;
    @Field({
        description:
            'Identifies the date and time when the object was last updated.',
    })
    updatedAt: Date;
}
