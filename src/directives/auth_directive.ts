import { SchemaDirectiveVisitor } from "graphql-tools";

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type: $TSFixMe) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field: $TSFixMe, details: $TSFixMe) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType: $TSFixMe) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      // @ts-expect-error TS(2304): Cannot find name 'defaultFieldResolver'.
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args: $TSFixMe[]) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole =
          field._requiredAuthRole ||
          objectType._requiredAuthRole;

        if (! requiredRole) {
          return resolve.apply(this, args);
        }

        const context = args[2];
        // @ts-expect-error TS(2304): Cannot find name 'getUser'.
        const user = await getUser(context.headers.authToken);
        if (! user.hasRole(requiredRole)) {
          throw new Error("not authorized");
        }

        return resolve.apply(this, args);
      };
    });
  }
}
