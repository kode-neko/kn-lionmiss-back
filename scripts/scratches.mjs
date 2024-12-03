import * as client from 'openid-client';

// OAuth variables
/*
const OAUTH_ISSUER = '';
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = '';
*/

async function initApp () {
  try {
    const config = await client.discovery(
      new URL(OAUTH_ISSUER),
      CLIENT_ID,
      CLIENT_SECRET
    );

    let code_challenge_method = 'S256';
    let code_verifier = client.randomPKCECodeVerifier();
    let code_challenge = await client.calculatePKCECodeChallenge(code_verifier);
    let nonce;

    let parameters = {
      redirect_uri: REDIRECT_URI,
      scope: 'openid email',
      code_challenge,
      code_challenge_method
    };

    if (!config.serverMetadata().supportsPKCE()) {
      nonce = client.randomNonce();
      parameters.nonce = nonce;
    }

    let redirectTo = client.buildAuthorizationUrl(config, parameters);

    console.log('redirecting to', redirectTo.href);
  } catch (error) {
    console.error('Error initializing OAuth client:', error);
  }
}

initApp();
