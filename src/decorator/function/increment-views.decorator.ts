import { Redis } from "ioredis";

/**
 *
 * Param Decorator postId 와 userId 를 받아서 오늘 게시글 조회수를 증가시키는 Decorator
 *
 * @returns
 */
export function IncrementViews(type?: any) {
  type;
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const storage = `todayPosts`;
    descriptor.value = async function (...args: any[]) {
      const postId = args[0];
      const userId = args[1];
      const cache = new Redis();
      const key = `postViews : ${postId}`;
      cache.pfadd(key, userId);
      cache.sadd(storage, postId);
      cache.quit();
      const result = await originalMethod.apply(this, args);

      return result;
    };
  };
}
