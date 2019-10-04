const db = require("../models");
const PostApi = db.Post;

const getPostsSequelize = async (req, res) => {
  try {
    const { authorID } = req.query;
    const posts = await PostApi.findAll({
      where: { authorID },
      order: [["id", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePostSequelize = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const updatedPost = await db.sequelize.transaction(async t => {
      //managed transaction is handled by passing a callback to sequelize.transaction method. Commits when the promise chain succesful, rollbacks on error
      const post = await PostApi.update(
        { content: value },
        { where: { id }, transaction: t, returning: true, plain: true }
      );
      if (post[1].id === 28) throw new Error("Rollback initiated");
      return post;
    });
    res.status(200).send(updatedPost);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deletePostSequelize = async (req, res) => {
  try {
    const { id } = req.params;
    const t = await db.sequelize.transaction(); // unmanaged transaction. Can also be executed via promise chain by .then and .catch
    const post = await PostApi.findOne({ where: { id }, transaction: t });
    if (post.id !== 2) {
      post.destroy();
      await t.commit();
    } else {
      await t.rollback();
      return res.status(403).send("Rollback initiated");
    }
    return res.status(200).send("ok");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getPostsSequelize,
  updatePostSequelize,
  deletePostSequelize
};
