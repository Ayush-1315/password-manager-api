const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.SECRET;

const {
  userSignupService,
} = require("../database-controllers/usersDatabase.controllers");

//Signup service

const signupService = async (req, res) => {
  const newUserData = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUserData.password, salt);
    const newUser = await userSignupService({
      ...newUserData,
      password: hashedPassword,
    });
    // console.log(newUser._id)
    const token = jwt.sign(
      { username: newUser.username, id: newUser._id },
      secret,
      { expiresIn: "2h" }
    );
    res.status(201).json({ message: "User created successfully", token });
  } catch (e) {
    if (e.code === 11000 && e.keyPattern.email)
      res.status(409).json({ message: "Email already exists" });
    else if (e.code === 11000 && e.keyPattern.username)
      res.status(409).json({ message: "Username exists" });
    else res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signupService };
