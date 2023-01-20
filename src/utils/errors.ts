export enum ErrorCode {
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  ILLEGAL_ARGUMENT = 'ILLEGAL_ARGUMENT',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  ILLEGAL_MIME_TYPE = 'ILLEGAL_MIME_TYPE',
}

export class EntityNotFoundError extends Error {
  public constructor(entityName: string, id?: unknown) {
    const idPart = id === undefined ? '' : `${id}`;
    const message = `The given ID "${idPart}" does not belong to a ${entityName.toLowerCase()}.`;
    super(message);

    Object.defineProperty(this, 'name', { value: 'EntityNotFoundError' });
  }
}

export class IllegalArgumentError extends Error {
  public constructor(message: string, code: string = ErrorCode.ILLEGAL_ARGUMENT) {
    super(`${message}: CODE: ${code}`);
    Object.defineProperty(this, 'name', { value: 'IllegalArgumentError' });
  }
}

export class AuthenticationError extends Error {
  public constructor(message = 'Invalid Authentication') {
    super(`${message}: CODE: ${ErrorCode.UNAUTHENTICATED}`);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}

export class PermissionDenied extends Error {
  public constructor(message = 'You do not have permission to perform this action') {
    super(`${message}: CODE: ${ErrorCode.FORBIDDEN}`);
    Object.defineProperty(this, 'name', { value: 'PermissionDenied' });
  }
}

export class InternalServerError extends Error {
  public constructor(reason: string) {
    super(`${reason}: CODE: ${ErrorCode.INTERNAL_SERVER_ERROR}`);

    Object.defineProperty(this, 'name', { value: 'InternalServerError' });
  }
}

export class IllegalMimeType extends Error {
  public constructor(mimeType: string) {
    const message = `The MimeType: ${mimeType} is not supported`;
    super(`${message}: CODE: ${ErrorCode.INTERNAL_SERVER_ERROR}`);

    Object.defineProperty(this, 'name', { value: 'IllegalMimeType' });
  }
}
