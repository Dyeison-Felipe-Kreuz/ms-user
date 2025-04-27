import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalConfig } from './global-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  void GlobalConfig(app)

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server isRunning in port 3000`);
}
void bootstrap();
