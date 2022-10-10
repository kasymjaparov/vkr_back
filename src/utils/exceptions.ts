/**
 * Кастомное исключение
 * @ClientError
 * @UnAuthorizedError
 * @ValidationError
 * @Forbidden
 */
class ApiError extends Error {
  statusCode: number;
  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }
  static ClientError(msg: string) {
    return new ApiError(msg, 400);
  }
  static UnAuthorizedError(msg: string) {
    return new ApiError(msg, 401);
  }
  static ValidationError(msg: string) {
    return new ApiError(msg, 422);
  }
  static Forbidden(msg:string) {
    return new ApiError(msg, 403)
  }
}
export default ApiError