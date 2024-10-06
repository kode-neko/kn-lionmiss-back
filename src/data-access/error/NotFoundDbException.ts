class NotFoundDbException extends Error {

  constructor () {
    super('NotFoundDbException: Not found document');
  }

}

export default NotFoundDbException;
