const { cassandraClient, TABLE } = require('../factories/CassandraFactory');

const createTrainingPreference = async (trainingPreference) => {
  const query = `
    INSERT INTO ${TABLE} (user_id, days_per_week, hours_per_day, availability_start_hour, availability_end_hour)
    VALUES (?, ?, ?, ?, ?);
  `;
  const params = [
    trainingPreference.user_id,
    trainingPreference.days_per_week,
    trainingPreference.hours_per_day,
    trainingPreference.availability_start_hour,
    trainingPreference.availability_end_hour,
  ];

  await cassandraClient.execute(query, params, { prepare: true });
};

const updateTrainingPreference = async (trainingPreference) => {
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
    trainingPreference.days_per_week,
    trainingPreference.hours_per_day,
    trainingPreference.availability_start_hour,
    trainingPreference.availability_end_hour,
    trainingPreference.user_id,
  ];

  await cassandraClient.execute(query, params, { prepare: true });
};

const findTrainingPreferenceByUserId = async (user_id) => {
  const query = `SELECT * FROM ${TABLE} WHERE user_id = ?`;
  const params = [user_id];

  const result = await cassandraClient.execute(query, params, { prepare: true });
  return result.rows[0];
};

module.exports = { createTrainingPreferences: createTrainingPreference, updateTrainingPreferences: updateTrainingPreference, findTrainingPreferencesByUserId: findTrainingPreferenceByUserId };