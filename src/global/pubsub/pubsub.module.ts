import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PubSubService } from './punsub.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'REDIS_CLIENT',
        imports: [],
        inject: [],
        useFactory: () => {
          return {
            transport: Transport.REDIS,
            options: {
              host: 'maglev.proxy.rlwy.net',
              port: 29529,
              password: 'iLtUkvcaNVREjOHDgvtfWvckFXZbiewT',
              retryAttempts: 5, // Tentativas de reconexão
              retryDelay: 3000, // Intervalo entre tentativas
            },
          };
        },
      },
    ]),
  ],
  providers: [PubSubService],
  exports: [PubSubService],
})
export class PubSubModule {}
