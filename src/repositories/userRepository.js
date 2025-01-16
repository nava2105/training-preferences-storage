const { cassandraClient, TABLE } = require('../factories/cassandraFactory');

const createUser = async (user) => {
  const query = `
    INSERT INTO ${TABLE} (user_id, days_per_week, hours_per_day, availability_start_hour, availability_end_hour)
    VALUES (?, ?, ?, ?, ?);
  `;
  const params = [
    user.user_id,
    user.days_per_week,
    user.hours_per_day,
    user.availability_start_hour,
    user.availability_end_hour,
  ];

  await cassandraClient.execute(query, params, { prepare: true });
};

const updateUser = async (user) => {
  const query = `
    UPDATE ${TABLE}
    SET 
      days_per_week = ?, 
      hours_per_day = ?, 
      availability_start_hour = ?, 
      availability_end_hour = ?
    WHERE user_id = ?;
  `;
  const params = [
    user.days_per_week,
    user.hours_per_day,
    user.availability_start_hour,
    user.availability_end_hour,
    user.user_id,
  ];

  await cassandraClient.execute(query, params, { prepare: true });
};

const findUserById = async (user_id) => {
  const query = `SELECT * FROM ${TABLE} WHERE user_id = ?`;
  const params = [user_id];

  const result = await cassandraClient.execute(query, params, { prepare: true });
  return result.rows[0];
};

module.exports = { createUser, updateUser, findUserById };