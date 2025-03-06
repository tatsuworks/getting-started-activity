import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

@Injectable()
export class BotService {
  constructor(private readonly configService: ConfigService) {
    const discordBotToken = this.configService.get<string>('DISCORD_BOT_TOKEN');

    if (!discordBotToken) {
      throw new Error('No discord bot token');
    }

    // When the client is ready, run this code (only once).
    // The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
    // It makes some properties non-nullable.
    client.once(Events.ClientReady, (readyClient) => {
      console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });

    client.on(Events.MessageCreate, (message) => {
      if (message.content === 'peepee') {
        console.log(message);
        message.reply('poopoo');
      }
    });

    // Log in to Discord with your client's token
    client.login(discordBotToken);
  }
}
