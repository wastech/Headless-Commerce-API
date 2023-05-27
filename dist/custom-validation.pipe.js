"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let CustomValidationPipe = class CustomValidationPipe {
    async transform(value, metadata) {
        const { metatype } = metadata;
        if (!metatype || !this.shouldValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(this.buildErrorMessage(errors));
        }
        return value;
    }
    shouldValidate(metatype) {
        const typesToSkip = [String, Boolean, Number, Array, Object];
        return !typesToSkip.includes(metatype);
    }
    buildErrorMessage(errors) {
        const errorMessages = errors.map((error) => {
            for (const property in error.constraints) {
                if (error.constraints.hasOwnProperty(property)) {
                    return error.constraints[property];
                }
            }
        });
        return errorMessages.join(', ');
    }
};
CustomValidationPipe = __decorate([
    (0, common_1.Injectable)()
], CustomValidationPipe);
exports.CustomValidationPipe = CustomValidationPipe;
//# sourceMappingURL=custom-validation.pipe.js.map