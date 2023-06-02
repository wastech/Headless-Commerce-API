"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const mongoose_config_1 = require("./database/mongoose.config");
const http_exception_filter_1 = require("./http-exception.filter");
const core_1 = require("@nestjs/core");
const cast_error_filter_1 = require("./cast-error.filter");
const dotenv_1 = require("dotenv");
const category_module_1 = require("./category/category.module");
const product_module_1 = require("./product/product.module");
const review_module_1 = require("./review/review.module");
(0, dotenv_1.config)({ path: 'config.env' });
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, mongoose_config_1.mongooseConfig)(),
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            review_module_1.ReviewModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            user_module_1.UserModule,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.AnyExceptionFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: cast_error_filter_1.CastErrorFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map