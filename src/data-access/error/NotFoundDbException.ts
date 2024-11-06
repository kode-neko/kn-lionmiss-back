class NotFoundDbException extends Error {

  constructor (docName?: string) {
    super(`NotFoundDbException: Not found document "${docName}"`);
  }

}

export default NotFoundDbException;
