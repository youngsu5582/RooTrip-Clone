import { Redis } from "ioredis";

/**
 *
 * Logic 내 어떤 Function 이 얼마나 호출됐는지 Redis에 기록하는 Decorator
 *
 * @returns
 */
export function CountApiUsage(type?: any) {
  type;
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cache = new Redis();
      const key = `apiUsage:${originalMethod.name}`;
      await cache.incr(key);
      const result = await originalMethod.apply(this, args);

      return result;
    };
    return descriptor;
  };
}
