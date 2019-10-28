"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id from "Users"'
    );

    return await queryInterface.bulkInsert(
      "Posts",
      [
        {
          content: "Post that can not be deleted, rolls back on deleting",
          authorID: users[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          content: "Post that can not be edited, rolls back on editing",
          authorID: users[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          content: "Post that can not be deleted, rolls back on deleting",
          authorID: users[0][1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          content: "Post that can not be edited, rolls back on editing",
          authorID: users[0][1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          content: "just a random post",
          authorID: users[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          content: "just a random post 2",
          authorID: users[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          content: "just a random post 3",
          authorID: users[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          content: "just a random post",
          authorID: users[0][1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          content: "just a random post 2",
          authorID: users[0][1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          content: "just a random post 3",
          authorID: users[0][1].id,
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
     return queryInterface.bulkDelete('Posts', null, {});
  }
};
