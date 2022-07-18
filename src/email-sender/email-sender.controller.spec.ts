import { Test, TestingModule } from '@nestjs/testing';
import { EmailSenderController } from './email-sender.controller';
import { EmailSenderService } from './email-sender.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('EmailSenderController', () => {
  let controller: EmailSenderController;
  const results = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailSenderController],
    })
      .useMocker((token) => {
        if (token === EmailSenderService) {
          return { sendWelcomeMsg: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<EmailSenderController>(EmailSenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
