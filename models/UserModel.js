const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: false,
    },
    age: {
      type: Number,
      require: false,
    },
    psn: {
        type: String,
        require: false,
    },
    live: {
        type: String,
        require: false,
    },
    steam: {
        type: String,
        require: false,
    },
    games: [{
      type: Number,
      require: false,
    }],
    friends: [{
      type: String,
      require: false,
    }]
  },

  {
    versionKey: false
  }
);

userSchema.pre("save", function(next) {
    var user = this;
    if (!user.isModified("password")) {
      return next();
    }
    bcrypt.hash(user.password, 10).then(hashedPassword => {
      user.password = hashedPassword;
      next();
    });
  },
  function(err) {
    next(err);
  }
);

userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

const User = mongoose.model("Users", userSchema);

module.exports = User;