export type ErrorType = 'network' | 'validation' |'conflict' | 'auth' | 'unknown' | 'notFoundItem' | 'create' |'update' | 'delete';

export type ErrorMessageProps = {
  type?: ErrorType;
  message?: string;
}