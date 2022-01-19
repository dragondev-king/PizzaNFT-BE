const multer = require('multer')
const { v4: uuid_v4 } = require('uuid');

const DIR = './public/profiles/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuid_v4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});

module.exports = app => {
  const { db_profile, db_auction, db_bid, db_history, get_hot_auction, transfer, settle_auction, mint, update_price } = require("../controllers/controller.js");
  var router = require("express").Router();

  // *************** Profile ******************************
  // Create a new profile
  router.post("/profile/create", db_profile().create);

  // Retrieve a single profile with account
  router.get("/profile/:account", db_profile().findOne);

  // Update a profile with account
  router.put("/profile/:account", upload.single('profileImg'), db_profile().update);

  // ************** Auction **************************
  router.post("/auction/create", db_auction().create);
  router.post("/auction/update", db_auction().update);

  // ************* MakeBid ***************************
  router.post("/bid/create", db_bid().create);
  router.post("/bid/all", db_bid().findAll);

  // ************ History **************************
  router.post("/history/all", db_history().findAll);

  // ********** Get Hot Auction *******************
  router.get("/hotauction", get_hot_auction().get);

  // ********** Transfer ******************
  router.post("/transfer", transfer().create);

  // ********** Settle Auction ************
  router.post("/settleauction", settle_auction().create);

  // ********* Update Price ************
  router.post("/updateprice", update_price().create);

  // ********** mint **************
  router.post("/mint", mint().create);
  
  app.use("/api", router);
};
