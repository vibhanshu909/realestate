export default function (model) {
  return {

    all: function ({ query, limit, skip }) {
      return model.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    },

    find: function ({ id }) {
      return model.findById(id);
    },

    first: function () {
      return model.findOne();
    },

    create: function (args) {
      return model.create(args);
    },

    update: function (args, validate = true) {
      const { id, ...rest } = args;
      return model.findByIdAndUpdate(id, rest, { new: true, runValidators: validate });
    },

    remove: async function ({ ids }) {
      try {
        console.log("ids", ids);
        ids.forEach(async (e) => {
          console.log("calling findOneAndRemove", e);
          await model.findOneAndRemove({ _id: e }, async (err, item) => {
            console.log("calling item.remove");
            return item && await item.remove()
          });
        })
      } catch (error) {

      }
      // return await model.deleteMany({ _id: { '$in':ids}});
    },

    model,
  }
}
