import { ROLES } from '../models/user';
const createResolver = (resolver) => {
    resolver.createResolver = (childResolver) => {
        const newResolver = async (parent, args, context, info) => {
            // this resolver may return a modified context
            const newContext = await resolver(parent, args, context, info);
            return childResolver(parent, args, newContext, info);
        };
        return createResolver(newResolver);
    };
    return resolver;
};

const isAuth = createResolver((parent, args, context, info) => {    
    if(context.expired){
        throw new Error("Session Expired");
    }
    else if(!context.user){
        throw new Error("Not Authenticated");
    }
    // return a new context for the next resolver if needed.
    return context;
});

const isAdmin = isAuth.createResolver((parent, args, context, info) => {
    if(context.user.role < ROLES.ADMIN){
        throw new Error("Not Administrator");
    }
    return context;
});

const isSuperAdmin = isAdmin.createResolver((parent, args, context, info) => {
    if(context.user.role < ROLES.SUPERADMIN){
        throw new Error("Not a Super Administrator");
    }
    return context;
});

export { createResolver, isAuth, isAdmin, isSuperAdmin };
