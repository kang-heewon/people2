import { InterceptorInterface, Interceptor, Action } from "routing-controllers";

interface ResultObject {
  result: Boolean;
  content: any;
}

@Interceptor()
export class ResponseJosnInterceptor implements InterceptorInterface {
  intercept(_: Action, content: any) {
    const resultObject: Partial<ResultObject> = {};
    resultObject.result = true;
    resultObject.content = content;
    return resultObject;
  }
}
