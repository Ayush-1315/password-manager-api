// Signup credential Validator
const validateSignupMiddleware = (req, res, next) => {
  const { username, password, email } = req.body;

  if (
    username.trim() &&
    email.trim() &&
    password.trim() &&
    typeof username === "string" &&
    typeof password === "string" &&
    typeof email === "string"
  ) {
    if (email.includes(".com") && email.includes("@"))
      if (password.length >= 8) {
        req.body.username = username.trim();
        req.body.passwod = password.trim();
        req.body.email = email.trim();
        next();
      } else
        res
          .status(400)
          .json({ message: "Password should be of 8 characters minimum" });
    else res.status(400).json({ message: "Enter a valid email address" });
  } else {
    res.status(400).json({
      message: "Username, Email and Password are minimum required fields",
    });
  }
};

//Login Credential Validator
const validateLoginMiddleware = (req, res, next) => {
  const { user, password } = req.body;
  if (
    user.trim() &&
    password.trim() &&
    typeof user === "string" &&
    typeof password === "string"
  ) {
    if (password.length >= 8) {
      req.body.user = user.trim();
      req.body.password = password.trim();
      next();
    } else res.status(400).json({ message: "Invalid Credentials" });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};
// Delete user Validator

const deleterUserMiddleware = (req, res, next) => {
  // const {username,password,id}=req.body;
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();
  const otp=req.body.otp?.trim();
  const id = req.params.id?.trim();
  if (username && password && id && otp) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Bad Request!, Please provide valid credentials and OTP" });
  }
};
module.exports = {
  validateSignupMiddleware,
  validateLoginMiddleware,
  deleterUserMiddleware,
};
