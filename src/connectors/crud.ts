export default function (model: $TSFixMe) {
  return {

    all: function ({
      query,
      limit,
      skip
    }: $TSFixMe) {
      return model.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    },

    find: function ({
      id
    }: $TSFixMe) {
      return model.findById(id);
    },

    first: function () {
      return model.findOne();
    },

    create: function (args: $TSFixMe) {
      return model.create(args);
    },

    update: function (args: $TSFixMe, validate = true) {
      const { id, ...rest } = args;
      return model.findByIdAndUpdate(id, rest, { new: true, runValidators: validate });
    },

    remove: async function ({
      ids
    }: $TSFixMe) {
      try {
        console.log("ids", ids);
        ids.forEach(async (e: $TSFixMe) => {
          console.log("calling findOneAndRemove", e);
          await model.findOneAndRemove({ _id: e }, async (err: $TSFixMe, item: $TSFixMe) => {
            console.log("calling item.remove");
            return item && (await item.remove());
          });
        })
      } catch (error) {

      }
      // return await model.deleteMany({ _id: { '$in':ids}});
    },

    model,
  };
}
