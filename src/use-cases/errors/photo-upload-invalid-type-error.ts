export class InvalidPhotoUploadTypeError extends Error {
  constructor() {
    super('Invalind photo file type.')
  }
}
