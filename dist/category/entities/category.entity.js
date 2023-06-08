"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Subcategory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategorySchema = exports.CategorySchema = exports.Subcategory = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let Category = class Category {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Category.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => [Subcategory] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_transformer_1.Type)(() => Subcategory),
    __metadata("design:type", Array)
], Category.prototype, "subcategories", void 0);
Category = __decorate([
    (0, mongoose_1.Schema)()
], Category);
exports.Category = Category;
let Subcategory = Subcategory_1 = class Subcategory {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Subcategory.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => [Subcategory_1] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_transformer_1.Type)(() => Subcategory_1),
    __metadata("design:type", Array)
], Subcategory.prototype, "subcategories", void 0);
Subcategory = Subcategory_1 = __decorate([
    (0, mongoose_1.Schema)()
], Subcategory);
exports.Subcategory = Subcategory;
exports.CategorySchema = mongoose_1.SchemaFactory.createForClass(Category);
exports.SubcategorySchema = mongoose_1.SchemaFactory.createForClass(Subcategory);
//# sourceMappingURL=category.entity.js.map