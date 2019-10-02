const UserApi = require("../models").User;

const getUsers = async (req, res) => {
  try {
    const users = await UserApi.findAll({
      include: ['Role', 'Posts'],
      attributes: { exclude: ["password", 'createdAt', 'updatedAt'] }
    });
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createUserSequelize = async (req, res) => {
  try {
    const newUserData = req.body;
    const newUser = await UserApi.create(newUserData);
    return res.status(200).send(newUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getUsers,
  createUserSequelize
};
