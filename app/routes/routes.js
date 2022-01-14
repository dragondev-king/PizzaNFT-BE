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
  const profile = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", profile.create);

  // Retrieve a single Tutorial with account
  router.get("/:account", profile.findOne);

  // Update a Tutorial with account
  router.put("/:account", upload.single('profileImg'), profile.update);

  // Delete a Tutorial with account
  router.delete("/:account", profile.delete);

  // Create a new Tutorial
  router.delete("/", profile.deleteAll);

  app.use("/api/profile", router);
};
