import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Chance } from 'chance';
import { INestApplication, Inject } from '@nestjs/common';
import { ScenicRegionService } from 'src/services/biz/scenic-region.service';

const chance = new Chance();

describe('SceneRegionService (e2e)', () => {
    let app: INestApplication;
    let scenicRegionService: ScenicRegionService;
    let createGQL = ``;
    let createResult = ``;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [ScenicRegionService],
        }).compile();

        scenicRegionService = moduleFixture.get<ScenicRegionService>(
            ScenicRegionService
        );
    });

    describe('createSeceneRegion', () => {
        it('should return an array of cats', async () => {
            // jest.spyOn(
            //     scenicRegionService,
            //     'createScenicRegion'
            // ).mockImplementation(() => createResult);

            expect(
                await request(app.getHttpServer()).post('/graphql').send({
                    query: createGQL,
                })
            ).toBe(createResult);
        });
    });
});
