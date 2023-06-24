import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

/**
 * data 에 담겨져 있는 token 을 추출해주는 Decorator
 */
export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    
    const request = ctx.switchToHttp().getRequest() as Request;
    return request.data.token as any;
  }
);
