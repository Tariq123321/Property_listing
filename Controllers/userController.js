const User = require('../Models/userSchema');
const errorLogger = require('../logger/errorLogger');
const successLogger = require('../logger/successLogger');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      errorLogger.error("User not found!");
      return res.status(404).json({ message: 'User not found' });
    }
    successLogger.http("User profile retrieved sucessfully");
    res.json(user);
  } catch (error) {
    errorLogger.error(`Internal server error! ${error.message}`);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      errorLogger.error("User not found!");
      return res.status(404).json({ message: 'User not found' });
    }
    successLogger.http("User updated sucessfully");
    res.json(user);
  } catch (error) {
    errorLogger.error(`Internal server error! ${error.message}`);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    successLogger.http("Users retrieved sucessfully");
    res.json(users);
  } catch (error) {
    errorLogger.error(`Internal server error! ${error.message}`);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      errorLogger.error("User not found!");
      return res.status(404).json({ message: 'User not found' });
    }
    successLogger.http("User retrieved sucessfully");
    res.json(user);
  } catch (error) {
    errorLogger.error(`Internal server error! ${error.message}`);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      errorLogger.error("User not found!");
      return res.status(404).json({ message: 'User not found' });
    }
    successLogger.http("User deleted sucessfully");
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    errorLogger.error(`Internal server error! ${error.message}`);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUserById
};
