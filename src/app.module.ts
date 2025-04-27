import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { PubSubModule } from './global/pubsub/pubsub.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UserModule, DatabaseModule, PubSubModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
