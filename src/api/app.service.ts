import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AllExceptionsFilter } from "src/infrastructure/lib/exeption/all.exeption.filter";
import { config } from "src/config";
import * as cookieParser from 'cookie-parser';
import { IoAdapter } from "@nestjs/platform-socket.io";


export default class Application {
  public static async main(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalFilters(new AllExceptionsFilter());

    app.use(cookieParser());

    app.enableCors({
      origin: '*',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
      }),
    );

    const apiPrefix = 'api';
    app.setGlobalPrefix(apiPrefix);

    app.useStaticAssets(join(process.cwd(), 'uploads'), {
      prefix: '/uploads/',
    });

    const swaggerConfig = new DocumentBuilder()
      .setTitle('RTU-Journals')
      .setDescription('API Documentation for OTP + Auth flow')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          description: 'Enter JWT token',
          name: 'Authorization',
          bearerFormat: 'JWT',
          scheme: 'bearer',
          in: 'header',
        },
        'token'
      ).addSecurityRequirements('Bearer').build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup(apiPrefix, app, document);

    app.useWebSocketAdapter(new IoAdapter(app));

    await app.listen(config.API_PORT || 3002);
    console.log(`🚀 Server running on http://localhost:${config.API_PORT || 3002}`);
    console.log(`📘 Swagger Docs: http://localhost:${config.API_PORT || 3002}/${apiPrefix}`);
  }
}
