import { Authentication } from "./Authenticate";

export const routingControllerOptions = {
  cors: true,
  defaultErrorHandler: false,
  currentUserChecker: Authentication.currentUserChecker,
  controllers: [`${__dirname}/../controllers/*.[jt]s`],
  middlewares: [`${__dirname}/../middlewares/*.[jt]s`],
  interceptors: [`${__dirname}/../interceptors/*.[jt]s`]
};
