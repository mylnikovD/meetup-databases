const controller = require('../controllers/users');
const DBTypes = require('../config/DBMS_types');

module.exports = router => {
  /* GET users listing. */
  router.get(`/${DBTypes.SEQUELIZE}`, controller.getUsersSequelize );
  router.post(`/${DBTypes.SEQUELIZE}`, controller.createUserSequelize)

};
