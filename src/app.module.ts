import { TouringRouteModule } from './resolvers/touring-route/touring-route.module';
import { ScenicSpotTypeModule } from './resolvers/scenic-spot-type/scenic-spot-type.module';
import { ScenicSpotModule } from './resolvers/scenic-spot/scenic-spot.module';
import { ScenicRegionModule } from './resolvers/scenic-region/scenic-region.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AuthModule } from './resolvers/auth/auth.module';
import { DateScalar } from './common/scalars/date.scalar';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './configs/config';
import { GraphqlConfig } from './configs/config.interface';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
        GraphQLModule.forRootAsync({
            useFactory: async (configService: ConfigService) => {
                const graphqlConfig =
                    configService.get<GraphqlConfig>('graphql');
                return {
                    buildSchemaOptions: {
                        numberScalarMode: 'integer',
                    },
                    sortSchema: graphqlConfig.sortSchema,
                    autoSchemaFile:
                        graphqlConfig.schemaDestination ||
                        './src/schema.graphql',
                    debug: graphqlConfig.debug,
                    playground: graphqlConfig.playgroundEnabled,
                    context: ({ req }) => ({ req }),
                };
            },
            inject: [ConfigService],
        }),
        AuthModule,
        ScenicRegionModule,
        ScenicSpotModule,
        ScenicSpotTypeModule,
        TouringRouteModule,
    ],
    controllers: [],
    providers: [DateScalar],
})
export class AppModule {}
