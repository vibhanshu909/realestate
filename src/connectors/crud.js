export default function(model){
    return {

        all: function({limit, skip}) {
            return model.find().skip(skip).limit(limit).sort({createdAt: -1});
        },

        find: function({id}) {
            return model.findById(id);
        },

        create: function(args) {
            return new model(args).save();
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
