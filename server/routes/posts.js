const controller = require("../controllers/posts");
const DBTypes = require("../config/DBMS_types");

module.exports = router => {
  /* GET posts listing. */
  router.get(`/${DBTypes.SEQUELIZE}`, controller.getPostsSequelize);
  router.get(`/${DBTypes.BOOKSHELF}`, controller.getPostsBS);
  router.put(`/${DBTypes.SEQUELIZE}/:id`, controller.updatePostSequelize);
  router.put(`/${DBTypes.BOOKSHELF}/:id`, controller.updatePostBS);
  router.delete(`/${DBTypes.SEQUELIZE}/:id`, controller.deletePostSequelize);
  router.delete(`/${DBTypes.BOOKSHELF}/:id`, controller.deletePostBS);
};
