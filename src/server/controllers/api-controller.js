/* eslint-disable no-console */
const AppDAO = require('../database/AppDAO');

const TABLE_NAME = 'scores';

const db = new AppDAO('db.sqlite');

db.tableExists(TABLE_NAME)
  .then((response) => {
    if (response.exist === 0) {
      db.createTable(TABLE_NAME, [
        {
          name: 'id',
          type: 'primary',
        },
        {
          name: 'score',
          type: 'TEXT',
          notNull: true,
        },
      ]);
    }
  });

/**
 * Get all scores
 */
exports.scoresAll = async (req, res) => {
  db.all(`SELECT * FROM ${TABLE_NAME}`)
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
    });
};

/**
 * Get all scores
 */
exports.scoreAdd = async (req, res) => {
  const { score } = req.body;

  const sql = `
    INSERT INTO ${TABLE_NAME}(score)
    VALUES (?)
  `;

  db.run(sql, [score])
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
    });
};
