import { UserService } from './user-management.service';
export declare class UserManagementController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): {
        id: string;
        email: string;
        role: string;
        status: string;
    }[];
    deleteUser(id: string): {
        message: string;
    };
}
