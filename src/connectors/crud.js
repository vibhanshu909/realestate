export default function(model){
    return {

        all: function({query, limit, skip}) {
            return model.find(query).skip(skip).limit(limit).sort({createdAt: -1});
        },

        find: function({id}) {
            return model.findById(id);
        },

        create: function(args) {
            return model.create(args);
        },

        update: async function(args) {
            const { id, ...rest } = args;
            return await model.findByIdAndUpdate(id, rest);
        },

        remove: async function({ids}) {           
            console.log("args...", ids); 
            // ids.forEach(e => (await model.deleteOne({ _id: e })));
            try {                
                ids.forEach(async (e) => {
                    await model.findOneAndRemove({_id: e}, (err, item) => item.remove());
                })
            } catch (error) {
                
            }
            // return await model.deleteMany({ _id: { '$in':ids}});
        },

        model,
    }
}
