const db = require("../models");
const Profile = db.profile;

// Create and Save a new Profile
exports.create = (req, res) => {
  // Validate request
  if (!req.body.account) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a profile
  const profile = new Profile({
    account: req.body.account,
  });

  // Save profile in the database
  profile
    .save(profile)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the profile."
      });
    });
};

// Find a single profile with an id
exports.findOne = (req, res) => {
  const account = req.params.account;

  Profile.find({account:account})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found profile with account " + account });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving profile with account=" + account });
    });
};

// Update a profile by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const url = req.protocol + '://' + req.get('host')

  const account = req.params.account;

  const profile ={$set: {
    name: req.body.name,
    profileImg: url + '/profiles/' + req.file.filename,
    profileUrl: req.body.profileUrl
  }};

  Profile.updateOne({account: account}, profile, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update profile with account=${account}. Maybe profile was not found!`
        });
      } else res.send({ message: "profile was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating profile with account=" + account
      });
    });
};

// Delete a profile with the specified id in the request
exports.delete = (req, res) => {
  const account = req.params.account;

  Profile.findByIdAndRemove(account, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete profile with account=${account}. Maybe profile was not found!`
        });
      } else {
        res.send({
          message: "profile was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete profile with account=" + account
      });
    });
};

// Delete all profiles from the database.
exports.deleteAll = (req, res) => {
  Profile.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} profiles were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all profiles."
      });
    });
};