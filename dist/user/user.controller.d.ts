import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    register(createAuthDto: CreateUserDto): Promise<{
        user: User;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: {
            token: string;
            user: User;
        };
    }>;
    getProfile(req: any): any;
    updateUser(id: string, UpdateAuthDto: any, req: any): Promise<User>;
    changePassword(oldPassword: string, newPassword: string, req: any): Promise<User>;
    deleteUser(req: any, userId: string): Promise<{
        message: string;
    }>;
    getUser(id: string): Promise<User>;
}
