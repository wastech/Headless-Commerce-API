"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const custom_validation_pipe_1 = require("./custom-validation.pipe");
const dotenv_1 = require("dotenv");
const compression = require("compression");
const bodyParser = require("body-parser");
async function bootstrap() {
    (0, dotenv_1.config)({ path: 'config.env' });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.useGlobalPipes(new custom_validation_pipe_1.CustomValidationPipe());
    await app.listen(process.env.PORT || 5000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map