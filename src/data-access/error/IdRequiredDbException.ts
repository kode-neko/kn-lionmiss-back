class IdRequiredDbException extends Error {

  constructor () {
    super(`IdRequiredDbException: The object has no id field`);
  }

}

export default IdRequiredDbException;
