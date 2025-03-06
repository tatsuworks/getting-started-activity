import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot.service';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '../.env' })],
  controllers: [AppController],
  providers: [AppService, BotService],
})
export class AppModule {}
