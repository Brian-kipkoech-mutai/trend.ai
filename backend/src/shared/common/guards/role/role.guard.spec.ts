 import { RoleGuard } from './role.guard';
 import { Reflector } from '@nestjs/core';

 describe('RoleGuard', () => {
   it('should be defined', () => {
     const mockReflector = new Reflector(); // Create a mock Reflector instance
     expect(new RoleGuard(mockReflector)).toBeDefined();
   });
 });
