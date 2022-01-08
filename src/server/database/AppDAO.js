const Database = require('better-sqlite3');
const path = require('path');

class AppDAO {
  /**
   * Creates an instance of AppDAO
   *
   * @param {String} dbFileName
   */
  constructor(dbFileName) {
    this.dbFile = dbFileName;

    const dbFilePath = path.join(__dirname, './', dbFileName);

    this.db = new Database(dbFilePath, {
      fileMustExist: true,
    });
  }

  /**
   * Retrieves a single row of data
   *
   * @example
   * const dao = new AppDAO('database.db')
   * dao.get('SELECT id, name FROM table')
   *   .then((row) => {
   *     console.log(row.name)
   *   })
   *   .catch((err) => {
   *     console.log('Error: ')
   *     console.log(JSON.stringify(err))
   *   })
   *
   * @param {String} sql
   * @param {Array} [params=[]]
   * @returns {Promise}
   */
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      const self = this;

      try {
        const stmt = this.db.prepare(sql);
        resolve(stmt.get(params));
      } catch (err) {
        self.logError(sql, err);
        reject(err);
      }
    });
  }

  /**
   * Retrieves many rows of data
   *
   * @example
   * const dao = new AppDAO('database.db')
   * dao.all('SELECT id, name FROM table')
   *   .then((rows) => {
   *     console.log(rows)
   *       rows.forEach(row => {
   *         console.log(row.name)
   *       })
   *   })
   *   .catch((err) => {
   *     console.log('Error: ')
   *     console.log(JSON.stringify(err))
   *   })
   *
   * @param {String} sql
   * @param {Array} [params=[]]
   *
   * @returns {Promise}
   */
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      const self = this;

      try {
        const stmt = this.db.prepare(sql);
        resolve(stmt.all(params));
      } catch (err) {
        self.logError(sql, err);
        reject(err);
      }
    });
  }

  /**
   * Runs the SQL query
   *
   * @example
   * const dao = new AppDAO('database.db')
   * dao.run('INSERT INTO table(value) VALUES(?)', [value])
   *   .then((response) => {
   *     console.log(response.lastID)
   *   })
   *   .catch((err) => {
   *     console.log('Error: ')
   *     console.log(JSON.stringify(err))
   *   })
   *
   * @param {String} sql
   * @param {Array} [params=[]]
   *
   * @returns {Promise}
   */
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      const self = this;

      try {
        const stmt = this.db.prepare(sql);
        const { changes, lastInsertRowid } = stmt.run(params);

        resolve({
          lastID: lastInsertRowid,
          changes,
        });
      } catch (err) {
        self.logError(sql, err);
        reject(err);
      }
    });
  }

  /**
   * Checks if a table exists
   *
   * @param {string} name
   * @returns {Promise}
   */
  tableExists(name) {
    const sql = `
      SELECT count(*) as exist FROM sqlite_master WHERE type='table' AND name='${name}'
    `;

    return this.get(sql);
  }

  /**
   * Creates a table
   *
   * @param {string} name
   * @param {Array} fields
   */
  createTable(name, data) {
    const fields = data.map((field) => {
      let value = `${field.name} `;

      if (field.type === 'primary') {
        value += 'INTEGER PRIMARY KEY AUTOINCREMENT';
      } else {
        value += `${field.type}`;

        if (field.notNull) value += ' NOT NULL';
      }

      return value;
    });

    const sql = `
      CREATE TABLE IF NOT EXISTS ${name} (
        ${fields.join(', ')},
        createdAt DATE DEFAULT (datetime('now','localtime'))
      )
    `;

    this.run(sql)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('[AppDAO::createTable()]', `The '${name}' table was created`);
      });
  }

  /**
   * Closes the connection
   *
   * @returns {Promise}
   */
  close() {
    return new Promise((resolve) => {
      this.db.close();
      resolve(true);
    });
  }

  /**
   * Logs the error
   *
   * @param {String} sql
   * @param {Error} err
   * @param {Array} [params=[]]
   */
  logError(sql, err, params = []) {
    // eslint-disable-next-line no-console
    console.log(`Error running sql: ${sql}`);

    if (err instanceof Database.SqliteError) {
      // eslint-disable-next-line no-console
      console.log(err.stack);
    } else {
      // eslint-disable-next-line no-console
      console.log(err, params);
    }

    return this;
  }
}

module.exports = AppDAO;
