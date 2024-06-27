const User = require("../models/user.model");
const verifyPassword = require("../utils/verifyPassword");

const addPasswordToUser = async (userId, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      const checkSavedPassword = user.passwords.findIndex(
        ({ username, platform }) =>
          username === newPassword.username && platform === newPassword.platform
      );
      if (checkSavedPassword === -1) {
        user.passwords.push(newPassword);
        await user.save();
        return user;
      } else {
        const error = new Error("Username already associated with a password.");
        error.status = 409;
        throw error;
      }
    } else {
      const error = new Error("User no found !");
      error.status = 404;
      throw error;
    }
  } catch (e) {
    throw e;
  }
};

const getAccountData = async (userId, passwordId, userPassword) => {
  try {
    const isValid = await verifyPassword(userId, userPassword);
    if (isValid) {
      const user = await User.findById(userId);
      const password = user.passwords.find(({ _id }) => _id.equals(passwordId));
      if (password !== null && password !== undefined) {
        const passwordData = {
          id: password._id,
          platform: password.platform,
          password: password.password,
          username: password.username,
          description: password.description,
        };
        return passwordData;
      } else {
        const error = new Error("Accout does not exist !");
        error.status = 404;
        throw error;
      }
    } else {
      const error = new Error("Unauthorized Access!");
      error.status = 401;
      throw error;
    }
  } catch (e) {
    throw e;
  }
};

const getAllPasswords = async (userId, index) => {
  try {
    const foundUser = await User.findById(userId);
    if (foundUser) {
      const startIndex = index - 1 === 0 ? 0 : (index - 1) * 10;
      const lastIndex = index * 10;
      const results = foundUser.passwords.slice(startIndex, lastIndex);
      return {
        data: results.map((ele) => ({
          _id: ele._id,
          username: ele.username,
          platform: ele.platform,
          description: ele.description,
        })),
        moreData: foundUser.passwords.length > index * 10,
      };
    } else {
      const error = new Error("Username not found");
      error.status = 404;
      throw error;
    }
  } catch (e) {
    throw e;
  }
};

//Searched Passwords

const getSearchedPasswords = async (userId, key) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      const results = user.passwords.filter(
        ({ username, platform, description }) =>
          username.toLocaleLowerCase().includes(key) ||
          platform.toLocaleLowerCase().includes(key) ||
          description.toLowerCase().includes(key)
      );
      return results.map((ele) => ({
        _id: ele._id,
        username: ele.username,
        platform: ele.platform,
        description: ele.description,
      }));
    } else {
      const error = new Error("User does not exist");
      error.status = 404;
      throw error;
    }
  } catch (e) {
    throw e;
  }
};
//Update Password
const updatePassword = async (userId, passId, update) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      const findPassword = user.passwords.id(passId);
      if (findPassword) {
        Object.assign(findPassword, update);
        return await user.save();
      } else {
        const error = new Error("Password");
        error.status = 404;
        throw error;
      }
    } else {
      const error = new Error("User does not exist");
      error.status = 404;
      throw error;
    }
  } catch (e) {
    throw e;
  }
};
module.exports = {
  addPasswordToUser,
  getAccountData,
  getAllPasswords,
  getSearchedPasswords,
  updatePassword,
};
