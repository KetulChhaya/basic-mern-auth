const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var salt = bcrypt.genSaltSync(12);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cPassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  msgs: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      msg: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//for hashing of pass before saving to db
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, salt);
    this.cPassword = bcrypt.hashSync(this.cPassword, salt);
  }
  next();
});

//generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let tokenProduced = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: tokenProduced });
    await this.save();
    return tokenProduced;
  } catch (error) {
    console.log(error);
  }
};

// Store the message
userSchema.methods.addMsg = async function (nameValue, email, phone, msg) {
  try {
    this.msgs = this.msgs.concat({ name: nameValue, email, phone, msg });
    await this.save();
    return this.msg;
  } catch (error) {
    console.log(error);
  }
};

//create a collection of defined userSchema
const User = new mongoose.model("USER", userSchema);

module.exports = User;
