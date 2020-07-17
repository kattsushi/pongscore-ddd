/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

/**
 * Bootstrapp App
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true });

  const options = new DocumentBuilder()
    .setTitle('PongScore')
    .setDescription('The pongscore API description')
    .setBasePath('/api/')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
