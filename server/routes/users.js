const controller = require('../controllers/users');
const DBTypes = require('../config/DBMS_types');

module.exports = router => {
  /* GET users listing. */
  router.get(`/${DBTypes.SEQUELIZE}`, controller.getUsersSequelize );
  router.get(`/${DBTypes.BOOKSHELF}`, controller.getUsersBS);
  router.post(`/${DBTypes.SEQUELIZE}`, controller.createUserSequelize);
  router.post(`/${DBTypes.BOOKSHELF}`, controller.createUserBS);

};
