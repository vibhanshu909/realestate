import { ROLES } from '../models/user';
import Activity from '../models/Activity';

const logger = async (_, args, ctx, info, result) => {  
  if (ctx.user && !ctx.expired && info.operation.operation === 'mutation' && result) {
    await Activity.create({
      user: ctx.user,
      activity: info.operation.name.value,
      arguments: info.variableValues,
      result
    });
  }
  return result;
}

const createResolver = (resolver) => {  
  resolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, ctx, info) => {
      // this resolver may return a modified ctx
      const newContext = await resolver(parent, args, ctx, info);      
      const result = await childResolver(parent, args, newContext, info);
      if (result !== newContext) {        
        logger(parent, args, newContext, info, result);
      }
      return result;
    };
    return createResolver(newResolver);
  };
  return resolver;
};

const isAuth = createResolver((_, __, ctx) => {
  if (ctx.expired) {
    throw new Error("Session Expired");
  }
  else if (!ctx.user) {
    throw new Error("Not Authenticated");
  }
  // return a new ctx for the next resolver if needed.
  return ctx;
});

const isAdmin = isAuth.createResolver((_, __, ctx) => {
  if (ctx.user.role < ROLES.ADMIN) {
    throw new Error("Not Administrator");
  }
  return ctx;
});

const isManager = isAuth.createResolver((_, __, ctx) => {
  if (ctx.user.role < ROLES.MANAGER) {
    throw new Error("Not a Manager");
  }
  return ctx;
});

export { createResolver, isAuth, isAdmin, isManager };
