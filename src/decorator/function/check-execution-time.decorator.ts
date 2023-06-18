export function CheckExecutionTime(type?: any) {
  type;
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const start = Date.now();
      const result = await originalMethod.apply(this, args);
      const end = Date.now();
      const executionTime = end - start;
      result.executionTime = `${executionTime}ms`;
      return result;
    };

    return descriptor;
  };
}
