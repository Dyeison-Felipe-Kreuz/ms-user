import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PubSubService {
  constructor(@Inject('REDIS_CLIENT') private client: ClientProxy) {}

  async get<T>(chanel: string, value: object, service = ''): Promise<T> {
    return await lastValueFrom(
      this.client.send({ cmd: this.getChannel(chanel, service) }, value),
    );
  }

  async set(key: string, value: unknown): Promise<unknown> {
    // Corrigido o erro com o uso de lastValueFrom
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const setValue = await lastValueFrom(this.client.send('set', [key, value]));
    return setValue;
  }

  publish(channel: string, value: object, service = '') {
    this.client.emit(this.getChannel(channel, service), value);
  }

  private getChannel(channel: string, service: string): string {
    return (service ?? 'ms-users') + '-' + channel;
  }
}
