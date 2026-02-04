type Middleware = (handler: any) => any;

export function compose(...middlewares: Middleware[]) {
  return (handler: any) => {
    return middlewares.reduceRight(
      (wrapped, middleware) => middleware(wrapped),
      handler
    );
  };
}