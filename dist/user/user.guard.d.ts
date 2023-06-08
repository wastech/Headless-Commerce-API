import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private readonly userService;
    constructor(jwtService: JwtService, reflector: Reflector, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
