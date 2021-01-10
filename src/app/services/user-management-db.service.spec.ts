import { TestBed } from '@angular/core/testing';

import { UserManagementDBService } from './user-management-db.service';

describe('UserManagementDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserManagementDBService = TestBed.get(UserManagementDBService);
    expect(service).toBeTruthy();
  });
});
