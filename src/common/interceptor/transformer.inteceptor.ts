import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';;

@Injectable()
export abstract class TransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
        map(async (data: any) => {        
          return await this.json(data);
        })
      );
  }

  protected async json(data: any): Promise<any> {
    return {
        status: true,
        status_code: HttpStatus.OK,
        message: "Success",
        data: await this.setData(data),
        timestamp: new Date().toISOString(),
    }
  }

  protected async setData(data: any): Promise<any> {
    return await this.format(data);
  }

  abstract format(data: any): Promise<any>;
}