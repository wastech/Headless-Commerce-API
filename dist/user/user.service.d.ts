import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Role } from './entities/user.entity';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    register(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        user: User;
    }>;
    findById(_id: string): Promise<User>;
    updateUser(userId: string, updateUserDto: UpdateUserDto, user: User): Promise<User>;
    updateUserPassword(userId: string, oldPassword: string, newPassword: string): Promise<User>;
    deleteUser(userId: string, userRole: Role): Promise<User>;
    getUser(id: string): Promise<User>;
}
