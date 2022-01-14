module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      account: String,
      name: String,
      profileImg: String,
      profileUrl: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Profile = mongoose.model("profile", schema);
  return Profile;
};
