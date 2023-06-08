import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject
} from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Logger } from "winston";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  intercept(context: ExecutionContext, next$: CallHandler): Observable<any> {
    return next$.handle().pipe(
      tap({
        next: (val: unknown) => {
          this.logger.info(val);
        },
        error: (err: Error) => {
          this.logger.error(err);
        }
      })
    );
  }
}
