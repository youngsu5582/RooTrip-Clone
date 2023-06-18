import { Redis } from "ioredis";

export function CountApiUsage(type?:any){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
          const cache = new Redis();
          const key = `apiUsage:${originalMethod.name}`;
          await cache.incr(key);
          const result = await originalMethod.apply(this, args);
          return result;
        };
        return descriptor;
    }
}
