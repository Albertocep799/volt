import { useEffect } from "react";

export default function AuthDiscord() {
  useEffect(() => {
    window.location.assign(
      "https://discord.com/oauth2/authorize?client_id=1394700525148049408&response_type=token&redirect_uri=https%3A%2F%2F5173-firebase-volt-1759925188300.cluster-cbeiita7rbe7iuwhvjs5zww2i4.cloudworkstations.dev&scope=guilds%20identify%20email&state=discord"
      // "https://discord.com/oauth2/authorize?client_id=1394700525148049408&response_type=token&redirect_uri=https%3A%2F%2F5173-firebase-volt-1759925188300.cluster-cbeiita7rbe7iuwhvjs5zww2i4.cloudworkstations.dev&scope=guilds%20identify%20email&state=discord"
    );
  }, []);
  return null;
}
