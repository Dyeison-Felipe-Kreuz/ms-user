import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export const GlobalConfig = async (app: INestApplication) => {
  const configSwagger = new DocumentBuilder()
    .setTitle('api-user')
    .setDescription('crud completo de usuários')
    .setVersion('1.0')
    .addTag('ms-users');

  const configBuilder = configSwagger.build();

  const document = SwaggerModule.createDocument(app, configBuilder);

  SwaggerModule.setup('docs', app, document);

  const logger = new Logger('RedisClient');

  const hedis = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'maglev.proxy.rlwy.net',
        port: 29529,
        password: 'iLtUkvcaNVREjOHDgvtfWvckFXZbiewT',
        retryAttempts: 5, // Tentativas de reconexão
        retryDelay: 3000, // Intervalo entre tentativas
      },
    },
  );

  await hedis.listen().then(() => logger.debug(`Redis is client is listening`));
};
