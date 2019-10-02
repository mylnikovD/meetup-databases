const PostApi = require("../models").Post;

const getPostsSequelize = async (req, res) => {
  try {
    const { authorID } = req.query;
    const posts = await PostApi.findAll({
      where: { authorID },
      order: [['id', 'ASC']],
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getPostsSequelize
};
