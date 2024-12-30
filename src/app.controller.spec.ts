import { Test, TestingModule } from '@nestjs/testing';
import { AcademiesController } from './controllers/app.controller';
import { AcademiesService } from './services/app.service';

describe('AppController', () => {
  let appController: AcademiesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AcademiesController],
      providers: [AcademiesService],
    }).compile();

    appController = app.get<AcademiesController>(AcademiesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
