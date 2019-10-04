const controller = require("../controllers/posts");
const DBTypes = require("../config/DBMS_types");

module.exports = router => {
  /* GET posts listing. */
  router.get(`/${DBTypes.SEQUELIZE}`, controller.getPostsSequelize);
  router.put(`/${DBTypes.SEQUELIZE}/:id`, controller.updatePostSequelize);
  router.delete(`/${DBTypes.SEQUELIZE}/:id`, controller.deletePostSequelize);
};
