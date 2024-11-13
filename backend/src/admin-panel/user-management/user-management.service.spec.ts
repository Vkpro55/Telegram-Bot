import { Test, TestingModule } from '@nestjs/testing';
import { UserManagementController } from './user-management.controller';

describe('UserManagementController', () => {
  let service: UserManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserManagementController],
    }).compile();

    service = module.get<UserManagementController>(UserManagementController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
