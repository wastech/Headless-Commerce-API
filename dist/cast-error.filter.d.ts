import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Error } from 'mongoose';
export declare class CastErrorFilter extends BaseExceptionFilter {
    catch(exception: Error.CastError, host: ArgumentsHost): void;
}
