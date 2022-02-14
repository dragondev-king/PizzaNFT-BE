module.exports = mongoose => {
  var profile = mongoose.Schema(
    {
      account: String,
      name: String,
      profileImg: String,
      profileUrl: String
    },
    { timestamps: true }
  );
  profile.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Profile = mongoose.model("profile", profile);

  var auction = mongoose.Schema(
    {
      tokenId: String,
      owner: String,
      status: String, //create, cancel, end
    },
    { timestamps: true }
  );
  auction.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Auction = mongoose.model("auction", auction);

  var bid = mongoose.Schema(
    {
      auction_id: String,
      bidder: String,
      amount: String, 
      status: String, //bid, cancel, win
    },
    { timestamps: true }
  );
  bid.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Bid = mongoose.model("bid", bid);

  var history = mongoose.Schema(
    {
      tokenId: String,
      event: String,
      owner: String,
      from: String,
      to: String,
      prevPrice: String,
      currPrice: String
    },
    { timestamps: true }
  )
  history.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const History = mongoose.model("history", history)

  var follow = mongoose.Schema(
    {
      owner: String,
      followAccount: String,
      state: String // true or false
    },
    { timestamps: true }
  )
  follow.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Follow = mongoose.model("follow", follow)

  return { Profile, Auction, Bid, History,  Follow};
};