class AuthException extends Error {

  constructor (msg: string) {
    super(`Auth header error: ${msg}`);
  }

}

export default AuthException;
