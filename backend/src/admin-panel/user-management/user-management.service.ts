import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: '1', email: 'admin@example.com', role: 'admin', status: 'active' },
    { id: '2', email: 'user@example.com', role: 'user', status: 'active' },
    { id: '3', email: 'vinod@example.com', role: 'admin', status: 'active' },
    { id: '4', email: 'deepak@example.com', role: 'user', status: 'active' },
  ];

  // Fetch all users
  getAllUsers() {
    return this.users;
  }

  // Delete a user by ID
  deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return { message: 'User deleted successfully' };
    }
    return { message: 'User not found' };
  }

  // Block a user by ID
  blockUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      user.status = 'blocked'; // Change the status to "blocked"
      return { message: `User with ID ${id} has been blocked` };
    }
    return { message: `User with ID ${id} not found` };
  }
}
