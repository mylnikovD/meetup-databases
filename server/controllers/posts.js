const db = require("../models");
const PostApi = db.Post;
const { Post: PostBS, bookshelf, knex } = require("../bookshelf");

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
      if (post[1].id === 28) throw new Error("Rollback initiated by Sequelize");
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
      return res.status(403).send("Rollback initiated by Sequelize");
    }
    return res.status(200).send("ok");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getPostsBS = async (req, res) => {
  try {
    const { authorID } = req.query;
    const posts = await PostBS.where("authorID", authorID)
      .orderBy("id", "ASC")
      .fetchAll();
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePostBS = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const updatedPost = await new Promise((resolve, reject) => {
      bookshelf
        .transaction(async t => {
          try {
            const model = await PostBS.where({ id }).save(
              { content: value },
              { transacting: t, patch: true, method: "update" }
            );
            if (model.attributes.id === 28) {
              throw new Error("Rollback initiated by bookshelf");
            }
            resolve(model);
          } catch (error) {
            throw error;
          }
        })
        .catch(err => reject(err));
    });
    return res.status(200).send(updatedPost);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deletePostBS = async (req, res) => {
  try {
    const { id } = req.params;
    const trx = await bookshelf.transaction();
    trx("Posts")
      .delete()
      .where("id", id)
      .then(() => {
        if (id != 2) {
          trx.commit();
          return res.status(200).send("ok");
        }
        throw new Error("Rollback initiated by bookshelf");
      })
      .catch(error => {
        trx.rollback();
        return res.status(500).send(error.message);
      });
    // const deletedPost = await new PostBS({ id })
    //   .destroy({ transacting: t })
    //   .then(async post => {
    //     if (id === '21') {
    //       console.log('here my dude');
    //       await t.rollback()
    //       return;
    //     }
    //     await t.commit();
    //     return post;
    //   });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getPostsSequelize,
  updatePostSequelize,
  deletePostSequelize,
  getPostsBS,
  updatePostBS,
  deletePostBS
};
