/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/aggregate" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/callback" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/collection" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/connection" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/cursor" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/document" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/error" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/expressions" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/helpers" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/middlewares" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/indexes" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/models" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/mongooseoptions" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/pipelinestage" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/populate" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/query" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/schemaoptions" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/schematypes" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/session" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/types" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/utility" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/validation" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/virtuals" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/inferschematype" />
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from '../../product/entities/product.entity';
export type OrderItemDocument = OrderItem & Document;
export declare class OrderItem {
    product: Product;
    quantity: number;
    image: string;
    name: string;
    price: number;
}
export declare const OrderItemSchema: MongooseSchema<OrderItem, import("mongoose").Model<OrderItem, any, any, any, Document<unknown, any, OrderItem> & Omit<OrderItem & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderItem, Document<unknown, {}, import("mongoose").FlatRecord<OrderItem>> & Omit<import("mongoose").FlatRecord<OrderItem> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
