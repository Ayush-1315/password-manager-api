const {
  addPasswordToUser,
  getAccountData,
  getAllPasswords,
  getSearchedPasswords,
} = require("../database-controllers/passwordDatabaseController.controller");
const { encryptPassword, decryptPassword } = require("../utils/cryptoPassword");

//Add Password
const addPasswordToUserService = async (req, res) => {
  const userId = req.params.id;
  const platform = req.body.platform;
  const password = req.body.password;
  const username = req.body.username;
  const description = req.body.description;

  try {
    const encryptedPassword = encryptPassword(password);
    const newPassword = {
      platform,
      password: encryptedPassword,
      username,
      description,
    };
    const savedUserPassoword = await addPasswordToUser(userId, newPassword);
    res.status(204).json({ message: "Password added" });
  } catch (e) {
    switch (e.status) {
      case 404:
        res.status(404).josn({ message: "User does not exist !" });
        break;
      case 409:
        res
          .status(409)
          .json({ message: "Username already associated with a password !" });
        break;
      default:
        res.status(500).json({ message: "Internal Server Error !" });
        break;
    }
  }
};

const getPasswordInfoService = async (req, res) => {
  const passwordId = req.params.passId;
  const userId = req.params.id;
  const userPassword = req.body.password;
  try {
    const foundData = await getAccountData(userId, passwordId, userPassword);
    const passwordData = decryptPassword(foundData.password);
    res.status(200).json({ ...foundData, password: passwordData });
  } catch (e) {
    switch (e.status) {
      case 404:
        res.status(404).json({ message: "Account does not exist" });
        break;
      default:
        res.status(500).json({ message: "Internal Server Error!" });
        break;
    }
  }
};

const getAllPasswordsService = async (req, res) => {
  const userId = req.params.id;
  const page = parseInt(req.query.page);
  try {
    const passwords = await getAllPasswords(userId, page);
    res.status(200).json({ message: "Saved Passwords", ...passwords });
  } catch (e) {
    switch (e.status) {
      case 404:
        res
          .status(404)
          .json({ message: "No user with existing user id found" });
        break;
      default:
        res.status(500).json({ message: "Internal server error." });
        break;
    }
  }
};

//Search Passwords
const getSearchedPasswordsService=async(req,res)=>{
  const userId=req.params.id;
  const search=req.query.search.toLowerCase();
  try{
    const searchedPasswords=await getSearchedPasswords(userId,search);
    res.status(200).json({message:"Searched results",data:searchedPasswords})
  }catch(e){
    switch (e.status){
      case 404: res.status(404).json({message:"User does not exist."})
      break;
      default: res.status(500).json({message:"Internal server error."});
      break;
    }
  }
}
module.exports = {
  addPasswordToUserService,
  getPasswordInfoService,
  getAllPasswordsService,
  getSearchedPasswordsService
};