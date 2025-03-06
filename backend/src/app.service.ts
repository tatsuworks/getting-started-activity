import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async authorizeWithDiscord(code: string) {
    const clientId = this.configService.get<string>('VITE_DISCORD_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'DISCORD_CLIENT_SECRET',
    );

    if (!clientId) {
      throw new HttpException('No clientId', HttpStatus.BAD_REQUEST);
    }

    if (!clientSecret) {
      throw new HttpException('No clientSecret', HttpStatus.BAD_REQUEST);
    }

    const response = await fetch(`https://discord.com/api/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
      }),
    });

    // Retrieve the access_token from the response
    // Return the access_token to our client as { access_token: "..."}
    return await response.json();
  }
}

// app.post("/api/token", async (req, res) => {

//   // Exchange the code for an access_token
// const response = await fetch(`https://discord.com/api/oauth2/token`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   body: new URLSearchParams({
//     client_id: process.env.VITE_DISCORD_CLIENT_ID,
//     client_secret: process.env.DISCORD_CLIENT_SECRET,
//     grant_type: 'authorization_code',
//     code: req.body.code,
//   }),
// });

//   // Retrieve the access_token from the response
//   const { access_token } = await response.json();

//   // Return the access_token to our client as { access_token: "..."}
//   res.send({ access_token });
// });
