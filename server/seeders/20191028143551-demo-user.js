"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = await queryInterface.sequelize.query(
      'SELECT id from "Roles"'
    );

    return await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullname: "admin adminson",
          email: "adminmail@mail.com",
          username: "mainadmin",
          password: "123",
          age: 25,
          roleID: roles[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullname: "user userson",
          email: "usermail@mail.com",
          username: "mainuser",
          password: "12345",
          age: 23,
          roleID: roles[0][1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Users", null, {});
  }
};
