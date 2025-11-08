import React, { useEffect } from 'react';

/**
 * This component handles the redirection to Google's OAuth2 authorization page.
 */
export default function AuthGoogle() {
  useEffect(() => {
    const CLIENT_ID = '679287157582-ogbq8tvonmtq6875isk2p76pvjepseb6.apps.googleusercontent.com';
    // CORRECTED: The redirect URI MUST point to a neutral page like the root,
    // not back to the auth trigger page itself, to avoid an infinite loop.
    const REDIRECT_URI = 'https://5173-firebase-volt-1759925188300.cluster-cbeiita7rbe7iuwhvjs5zww2i4.cloudworkstations.dev';
    const SCOPE = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    const STATE = 'google'; // Identify the provider

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${encodeURIComponent(SCOPE)}&state=${STATE}`;

    window.location.assign(authUrl);
  }, []);

  return null;
}
