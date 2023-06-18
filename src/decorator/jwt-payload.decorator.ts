import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

/**
 * data 에 담겨져 있는 jwtPayload 를 추출해주는 Decorator
 * 2023.06.18 Logout 때만 사용중이여서 필요한가에 대해 고민중
 */
export const JwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    return request.data.jwtPayload;
  }
);
