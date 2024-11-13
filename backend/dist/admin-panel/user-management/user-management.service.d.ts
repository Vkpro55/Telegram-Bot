export declare class UserService {
    private users;
    getAllUsers(): {
        id: string;
        email: string;
        role: string;
        status: string;
    }[];
    deleteUser(id: string): {
        message: string;
    };
    blockUser(id: string): {
        message: string;
    };
}
