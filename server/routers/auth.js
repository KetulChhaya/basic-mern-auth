const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//collection
require("../db/conn");
const User = require("../models/userSchema");

const authenticate = require("../middleware/authenticate");

//using promises
// router.post("/register", (req, res) => {
//   try {
//     const { name, email, phone, work, password, cPassword } = req.body;
//     if (!name || !email || !phone || !work || !password || !cPassword) {
//       return res.status(422).json({ error: "Please Input all the fields" });
//     }
//     User.findOne({ email: email })
//       .then((userExist) => {
//         if (userExist)
//           return res.status(422).json({ error: "Email already exists" });

//         const user = new User({
//           name: name,
//           email,
//           phone,
//           work,
//           password,
//           cPassword,
//         });
//         user
//           .save()
//           .then(() => {
//             res.status(201).json({ message: "User Created" });
//           })
//           .catch((err) =>
//             res
//               .status(500)
//               .json({ error: "Database Error Failed Registration" })
//           );
//       })
//       .catch((err) => console.log(err));
//   } catch (err) {
//     res.send(err);
//   }
// });

//using async-await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cPassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cPassword) {
    return res.status(422).json({ error: "Please Input all the fields" });
  }
  try {
    const userExist = await User.findOne({ email: email }); //either 0 : false(no data) or 1 : true(full document)
    if (userExist)
      return res.status(422).json({ error: "Email already exists" });
    else if (password !== cPassword)
      return res.status(422).json({ error: "Passwords are not matching" });
    else {
      const user = new User({ name, email, phone, work, password, cPassword });

      const userRegister = await user.save();

      userRegister
        ? res.status(201).json({ message: "User Registered" })
        : res
            .status(201)
            .json({ message: "Database Error User isn't registered" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(422)
        .json({ err: "Please Fill all the required fields" });
    const userLogin = await User.findOne({
      email: email,
    });
    if (!userLogin) {
      return res.status(422).json({ error: "Invalid Credentials" });
    } else {
      const token = await userLogin.generateAuthToken();
      // console.log(token);
      //storing generated token to the cookie
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      // console.log(userogin);
      const isMatch = await bcrypt.compareSync(password, userLogin.password);
      if (!isMatch)
        return res.status(422).json({ error: "Invalid Credentials" });
      return res.json({ message: "Login Successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", authenticate, (req, res) => {
  console.log("Hello to the About Section");
  res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, msg } = req.body;
    if (!name || !email || !phone || !msg) {
      console.log("Please Fill all the fields in the contact form");
      return res
        .status(422)
        .json({ error: "Please Fill All the Fields in the Contact Form" });
    }
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMsg = await userContact.addMsg(name, email, phone, msg);
      await userContact.save();
      res.status(201).json({ message: "User Contact Successfully Messaged" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  // console.log("Hello My Logout Page");
  // res.status(200).send("User Logout");
  // res.clearCookie("jwtoken", { path: "/" });
  // // res.status(200).send("Logout");
  res.clearCookie("jwtoken");
  return res.status(200).redirect("/login");
});

module.exports = router;
