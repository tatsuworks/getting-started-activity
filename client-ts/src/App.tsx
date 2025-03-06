import rocketLogo from './assets/rocket.png'
import './App.css'
import { DiscordSDK } from "@discord/embedded-app-sdk"
import { useEffect, useState } from 'react';
import { AuthResponse } from './types';
// Instantiate the SDK
const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

async function setupDiscordSdk(): Promise<AuthResponse> {
  await discordSdk.ready();

  // Authorize with Discord Client
  const { code } = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: [
      "identify",
      "guilds",
      "applications.commands"
    ],
  });

  const response = await fetch("/.proxy/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });

  const { access_token } = await response.json();

  // Authenticate with Discord client (using the access_token)
  const auth = await discordSdk.commands.authenticate({
    access_token,
  });

  if (auth == null) {
    throw new Error("Authenticate command failed");
  }

  return auth;
}

function App() {
  const [authObj, setAuth] = useState<AuthResponse>();
  useEffect(() => {
    setupDiscordSdk().then((auth) => {
      console.log("Discord SDK is ready");
      setAuth(auth);
    });
  }, []);


  return (
    <>
    <img src={rocketLogo} className="logo" alt="Rocket logo" />
    <h1>Hello, {authObj?.user?.username}!</h1>
    </>
  )
}

export default App
