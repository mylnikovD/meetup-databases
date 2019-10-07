const { Op } = require("sequelize");
const UserApi = require("../models").User;
const { User: UserBS, knex } = require("../bookshelf");

const getUsersSequelize = async (req, res) => {
  try {
    const { limit, offset, name } = req.query;
    const users = await UserApi.findAndCountAll({
      where: name ? { fullname: { [Op.iLike]: `%${name}%` } } : null,
      include: ["Role"],
      order: [["id", "ASC"]],
      limit,
      offset,
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      distinct: true
    });
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createUserSequelize = async (req, res) => {
  try {
    const newUserData = req.body;
    let newUser = await UserApi.create(newUserData, {
      include: ["Role"]
    });
    newUser = await newUser.reload();
    return res.status(200).send(newUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUserBS = async (req, res) => {
  try {
    const { limit, offset, name } = req.query;
    const users = await UserBS.where("fullname", "LIKE", `%${name}%`)
      .orderBy("id", "ASC")
      .fetchAll({ require: true, withRelated: ["Role"], limit, offset });
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getUsersSequelize,
  createUserSequelize,
  getUserBS
};
