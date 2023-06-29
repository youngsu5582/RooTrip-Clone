import { Logger } from "winston";

/**
 * Repository 내 Function 에 적용하는 Decorator
 * Date.now 가 아닌 performance.now 를 통해 더 세밀한 소수점 단위 ms 까지 측정
 * 
 * @returns 
 */
export function MeasureQueryExecutionTime() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        try {
            const startTime = performance.now();
            const result = await originalMethod.apply(this, args); // Repository 인스턴스에 메서드 적용
            const logger = new Logger();
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            logger.info(executionTime);
            return result;
          }
          catch(err){
            
          }         
      
    };

    return descriptor;
  };
}
