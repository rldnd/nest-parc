import {
  Injectable,
  NestInterceptor,
  NotFoundException,
  type CallHandler,
  type ExecutionContext,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof Error && error.name === 'NotFoundError') {
          throw new NotFoundException(error.message);
        } else throw error;
      }),
    );
  }
}
