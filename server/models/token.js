const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  addToken,
  findAllToken,
  removeTokenByID,
  findTokenById,
  updateTokenByID,
};

async function addToken(token) {
  return await db('token').insert(token, 'id');
}

async function findAllToken() {
  return await db('token');
}

async function findTokenById(id) {
  return await db('token').where({ _id: id }).first();
}

async function removeTokenByID(id) {
  return await db('token').where({ _id: id }).del();
}

async function updateTokenByID(id, changes) {
  return await db('hash')
    .where({ _id: id })
    .update(changes)
    .then(() => {
      return findTokenByUserID(id);
    });
}
