const controller = require('../controllers/posts');
const DBTypes = require('../config/DBMS_types');

module.exports = router => {
  /* GET posts listing. */
  router.get(`/${DBTypes.SEQUELIZE}`, controller.getPostsSequelize);

};