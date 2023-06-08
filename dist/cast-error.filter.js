"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
let CastErrorFilter = class CastErrorFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception.kind === 'ObjectId') {
            response.status(404).json({
                statusCode: 404,
                message: 'Invalid resource ID',
            });
        }
        else {
            super.catch(exception, host);
        }
    }
};
CastErrorFilter = __decorate([
    (0, common_1.Catch)(mongoose_1.Error.CastError)
], CastErrorFilter);
exports.CastErrorFilter = CastErrorFilter;
//# sourceMappingURL=cast-error.filter.js.map