export default function(model){
    return {

        all: async function({limit, offset}) {
            return await model.find().sort({createdAt: -1}).find({
                createdAt: { $gte: (offset === "0"? Date.parse(1, 0, 1970): Date.parse(offset)) }
            }).limit(limit);
        },

        find: async function({id}) {
            return await model.findById(id);
        },

        create: async function(args) {
            return await new model(args).save();
        },

        update: async function(args) {
            const { id, ...rest } = args;
            return await model.findByIdAndUpdate(id, rest);
        },

        remove: async function(args) {
            const { id } = args;
            return await model.findByIdAndRemove(id);
        },

        model,
    }
}
