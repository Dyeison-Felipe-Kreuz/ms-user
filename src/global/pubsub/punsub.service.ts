import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// LastValueFrom do RxJS, que converte um Observable em uma Promise
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PubSubService {

  // Injeta a instância do ClientProxy, que foi registrada com o nome 'REDIS_CLIENT'
  constructor(@Inject('REDIS_CLIENT') private client: ClientProxy) {}

  async get<T>(chanel: string, value: object, service = ''): Promise<T> {
    // Manda uma mensagem via Redis para o canal correto e espera a resposta.
     // `this.client.send` retorna um Observable, por isso usamos `lastValueFrom` para converter em Promise.
    return await lastValueFrom(
      // A mensagem enviada precisa ter uma propriedade `cmd` (comando)
      this.client.send({ cmd: this.getChannel(chanel, service) }, value),
    );
  }

  async set(key: string, value: unknown): Promise<unknown> {
    // Manda uma mensagem chamada 'set' para o Redis, com os parâmetros [key, value].
    // Também converte o Observable em Promise para trabalhar de forma assíncrona normal.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const setValue = await lastValueFrom(this.client.send('set', [key, value]));
    return setValue;
  }

  publish(channel: string, value: object, service = '') {
    // Emite um evento no canal definido.
    // Diferente do `send`, o `emit` apenas dispara a mensagem, sem esperar resposta.
    this.client.emit(this.getChannel(channel, service), value);
  }

  private getChannel(channel: string, service: string): string {
    return (service ?? 'ms-users') + '-' + channel;
  }
}
