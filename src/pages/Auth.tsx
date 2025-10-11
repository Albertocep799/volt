import { Navigate } from "react-router-dom";

function AuthLogic() {
  const searchParams = new URLSearchParams(
    window.location.hash.replace("#", "?")
  );
  const tokenType = searchParams.get("token_type");
  const accessToken = searchParams.get("access_token");
  const expires = searchParams.get("expires_in");

  if (tokenType && accessToken && expires) {
    const maxAge = parseInt(expires, 10);
    document.cookie = `tokenType=${encodeURIComponent(
      tokenType
    )}; path=/; max-age=${maxAge}`;
    document.cookie = `accessToken=${encodeURIComponent(
      accessToken
    )}; path=/; max-age=${maxAge}`;
    const expiresDate = new Date(Date.now() + maxAge * 1000).toUTCString();
    document.cookie = `expires=${encodeURIComponent(
      expiresDate
    )}; path=/; max-age=${maxAge}`;
  }

  return <Navigate to="/" />;
}

export default function Auth() {
  const searchParams = new URLSearchParams(
    window.location.hash.replace("#", "?")
  );

  if (!searchParams.has("access_token")) {
    // window.location.assign(
    //   "https://discord.com/oauth2/authorize?client_id=1394700525148049408&response_type=token&redirect_uri=https%3A%2F%2Fvolt.staffs.es%2Fauth%2F&scope=guilds"
    // );
    window.location.assign(
      "https://discord.com/oauth2/authorize?client_id=1394700525148049408&response_type=token&redirect_uri=https%3A%2F%2F5173-firebase-volt-1759925188300.cluster-cbeiita7rbe7iuwhvjs5zww2i4.cloudworkstations.dev%2Fauth%2F&scope=guilds"
    );
  }

  return <AuthLogic />;
}
