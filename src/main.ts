import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalConfig } from './global-config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  void GlobalConfig(app, configService)

  await app.listen(configService.get<string>('PORT') ?? 3000);
  console.log(`Server isRunning in port 3000`);
}
void bootstrap();
