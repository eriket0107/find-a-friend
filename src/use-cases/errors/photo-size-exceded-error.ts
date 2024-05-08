export class PhotoSizeExcededError extends Error {
  constructor() {
    super('Photo size exceded.')
  }
}
